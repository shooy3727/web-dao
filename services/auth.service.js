const pool = require("../database/db");
const bcrypt = require("bcrypt");
const {
  sendPasswordResetCode
} = require("../utils/telegram.bot");

// Register
async function registerUser({
  fullname,
  telegram,
  username,
  password,
  confirm_password
}) {
    
    const client = await pool.connect();

    try {

        await client.query("BEGIN");

        fullname = fullname?.trim().replace(/\s+/g, " ");
        telegram = telegram?.trim();
        username = username?.trim().toLowerCase();

        if (!fullname) {
            throw new Error("FULLNAME_REQUIRED");
        }

        if (!telegram) {
            throw new Error("TELEGRAM_REQUIRED");
        }

        if (telegram.startsWith("@")) {
            telegram = telegram.slice(1).toLowerCase();
        }

        if (!username) {
            throw new Error("USERNAME_REQUIRED");
        }

        username = username.toLowerCase();

        if (!/^[a-z0-9]{5,50}$/.test(username)) {
            throw new Error("INVALID_USERNAME");
        }

        if (!password) {
            throw new Error("PASSWORD_REQUIRED");
        }

        if (!confirm_password) {
            throw new Error("CONFIRM_PASSWORD_REQUIRED");
        }

        if (password.length < 8) {
            throw new Error("PASSWORD_TOO_SHORT");
        }

        if (password !== confirm_password) {
            throw new Error("PASSWORD_NOT_MATCH");
        }

        // Telegram
        if (
            !/^[a-zA-Z0-9_]{5,32}$/.test(telegram) &&
            !/^[0-9]{8,15}$/.test(telegram)
        ) {
            throw new Error("INVALID_TELEGRAM");
        }

        // Check username
        const existed = await client.query(
            `
            SELECT id
            FROM users
            WHERE username=$1
            `,
            [
                username
            ]
        );

        if(existed.rows.length){
            throw new Error("USERNAME_EXISTS");
        }

        const telegramExist = await client.query(
            `
            SELECT id
            FROM users
            WHERE telegram_username=$1
            `,
            [telegram]
        );

        if (telegramExist.rows.length) {
            throw new Error("TELEGRAM_EXISTS");
        }

        // Hash password
        const passwordHash = await bcrypt.hash(
            password,
            12
        );

        // Create user

        const userResult = await client.query(
            `
            INSERT INTO users
            (
                username,
                password_hash,
                fullname,
                telegram_username,
                status,
                role
            )
            VALUES
            (
                $1,
                $2,
                $3,
                $4,
                'block',
                'user'
            )

            RETURNING id
            `,
            [
                username,
                passwordHash,
                fullname,
                telegram
            ]
        );


        const userId = userResult.rows[0].id;

        await client.query("COMMIT");

        return {
            userId
        };

    }
    catch(err){
        await client.query("ROLLBACK");
        throw err;
    }
    finally{
        client.release();
    }

}

// Login User
async function loginUser({
    username,
    password
}) {

    username = username?.trim().toLowerCase();


    if (!username) {
        throw new Error("USERNAME_REQUIRED");
    }


    if (!password) {
        throw new Error("PASSWORD_REQUIRED");
    }


    const result = await pool.query(
        `
        SELECT
            id,
            username,
            password_hash,
            fullname,
            telegram_username,
            telegram_verified,
            status,
            role
        FROM users
        WHERE username = $1
        LIMIT 1
        `,
        [
            username
        ]
    );


    if (!result.rows.length) {
        throw new Error("INVALID_LOGIN");
    }


    const user = result.rows[0];


    const passwordMatch = await bcrypt.compare(
        password,
        user.password_hash
    );


    if (!passwordMatch) {
        throw new Error("INVALID_LOGIN");
    }


    return user;
    
}

// Request Password Reset
async function requestPasswordReset({
  username
}) {

    username = username?.trim().toLowerCase();

    if (!username) {
        throw new Error("USERNAME_REQUIRED");
    }

    // TÌM USER
    const result = await pool.query(
        `
        SELECT
            id,
            username,
            telegram_chat_id,
            telegram_verified,
            telegram_username
        FROM users
        WHERE username = $1
            OR phone = $1
        LIMIT 1
        `,
        [username]
    );

    if (!result.rows.length) {
        throw new Error("USER_NOT_FOUND");
    }

    const user = result.rows[0];

    // KIỂM TRA TELEGRAM
    if (
        !user.telegram_verified ||
        !user.telegram_chat_id
    ) {
        throw new Error("TELEGRAM_NOT_VERIFIED");
    }

    // COOLDOWN SAU KHI OTP BỊ NHẬP SAI 3 LẦN
    const failedOtpResult = await pool.query(
        `
        SELECT
            id,
            verified_at
        FROM verification_codes
        WHERE user_id = $1
        AND type = 'forgot_password'
        AND attempts >= max_attempts
        AND verified_at IS NOT NULL
        ORDER BY verified_at DESC
        `,
        [user.id]
    );

    const failedCount = failedOtpResult.rows.length;

    if (failedCount > 0) {

        const latestFailedAt = new Date(
            failedOtpResult.rows[0].verified_at
        );

        let cooldownSeconds;

        // Lần khóa thứ 1
        if (failedCount === 1) {

            cooldownSeconds = 30;

        // Lần khóa thứ 2
        } else if (failedCount === 2) {

            cooldownSeconds = 60;

        // Lần khóa thứ 3 trở đi
        } else {

            // Lần 3 = 5 phút
            // Lần 4 = 10 phút
            // Lần 5 = 15 phút
            cooldownSeconds =
                (failedCount - 2) * 5 * 60;
        }

        const elapsedSeconds = (Date.now() - latestFailedAt.getTime()) / 1000;

        if (elapsedSeconds < cooldownSeconds) {

            const error = new Error("OTP_FAILED_COOLDOWN");

            error.remainingSeconds = Math.ceil(
                cooldownSeconds - elapsedSeconds
            );

            throw error;
        }
    }

    // ==================================================
    // TẠO OTP 6 SỐ
    // ==================================================
    const code = Math.floor(
        100000 + Math.random() * 900000
    ).toString();

    const expiresAt = new Date(
        Date.now() + 5 * 60 * 1000
    );

    // ==================================================
    // GỬI OTP QUA TELEGRAM TRƯỚC
    // ==================================================
    const sent = await sendPasswordResetCode({
        chatId: user.telegram_chat_id,
        code
    });

    if (!sent) {
        throw new Error("TELEGRAM_SEND_FAILED");
    }

    // ==================================================
    // GỬI THÀNH CÔNG → VÔ HIỆU HÓA OTP CŨ
    // ==================================================
    await pool.query(
        `
        UPDATE verification_codes
        SET verified_at = NOW()
        WHERE user_id = $1
        AND type = 'forgot_password'
        AND verified_at IS NULL
        `,
        [user.id]
    );

    // ==================================================
    // LƯU OTP MỚI
    // ==================================================
    await pool.query(
        `
        INSERT INTO verification_codes
        (
            user_id,
            telegram_username,
            telegram_chat_id,
            code,
            type,
            expires_at,
            last_sent_at,
            max_attempts
        )
        VALUES
        (
            $1,
            $2,
            $3,
            $4,
            'forgot_password',
            $5,
            NOW(),
            3
        )
        `,
        [
            user.id,
            user.telegram_username,
            user.telegram_chat_id,
            code,
            expiresAt
        ]
    );

    return {
        userId: user.id,
        username: user.username
    };
}

// Verify Forgot Password OTP
async function verifyForgotPasswordCode({
    username,
    code
}) {

    username = username?.trim().toLowerCase();
    code = code?.trim();

    if (!username) {
        throw new Error("USERNAME_REQUIRED");
    }

    if (!code) {
        throw new Error("OTP_REQUIRED");
    }

    if (!/^\d{6}$/.test(code)) {
        throw new Error("OTP_INVALID");
    }

    // Tìm user bằng username hoặc phone
    const userResult = await pool.query(
        `
        SELECT
            id,
            username,
            phone
        FROM users
        WHERE username = $1
           OR phone = $1
        LIMIT 1
        `,
        [username]
    );

    if (!userResult.rows.length) {
        throw new Error("USER_NOT_FOUND");
    }

    const user = userResult.rows[0];

    // Lấy OTP mới nhất
    const otpResult = await pool.query(
        `
        SELECT
            id,
            code,
            attempts,
            max_attempts,
            expires_at,
            verified_at
        FROM verification_codes
        WHERE user_id = $1
          AND type = 'forgot_password'
        ORDER BY created_at DESC
        LIMIT 1
        `,
        [user.id]
    );

    if (!otpResult.rows.length) {
        throw new Error("OTP_NOT_FOUND");
    }

    const otp = otpResult.rows[0];

    // Quá số lần thử
    if (otp.attempts >= otp.max_attempts) {
        throw new Error("OTP_TOO_MANY_ATTEMPTS");
    }

    // Đã sử dụng
    if (otp.verified_at) {
        throw new Error("OTP_ALREADY_USED");
    }

    // Hết hạn
    if (new Date(otp.expires_at) <= new Date()) {
        throw new Error("OTP_EXPIRED");
    }

    // Sai OTP
    if (otp.code !== code) {

        const newAttempts = otp.attempts + 1;

        await pool.query(
            `
            UPDATE verification_codes
            SET
                attempts = $1,
                verified_at = CASE
                    WHEN $1 >= max_attempts THEN NOW()
                    ELSE verified_at
                END
            WHERE id = $2
            `,
            [
                newAttempts,
                otp.id
            ]
        );

        if (newAttempts >= otp.max_attempts) {
            throw new Error("OTP_TOO_MANY_ATTEMPTS");
            error.attempts = newAttempts;
            error.maxAttempts = otp.max_attempts;

            throw error;
        }

        const error = new Error("OTP_WRONG");

        error.attempts = newAttempts;
        error.remainingAttempts = otp.max_attempts - newAttempts;
        throw error;
    }

    // OTP đúng
    await pool.query(
        `
        UPDATE verification_codes
        SET verified_at = NOW()
        WHERE id = $1
        `,
        [otp.id]
    );

    return {
        userId: user.id,
        username: user.username
    };
}

// Reset Password
async function resetPassword({
    userId,
    tokenIssuedAt,
    password,
    confirm_password
}) {

    if (!password) {
        throw new Error("PASSWORD_REQUIRED");
    }

    if (!confirm_password) {
        throw new Error("CONFIRM_PASSWORD_REQUIRED");
    }

    if (password.length < 8) {
        throw new Error("PASSWORD_TOO_SHORT");
    }

    if (password !== confirm_password) {
        throw new Error("PASSWORD_NOT_MATCH");
    }

    const userResult = await pool.query(
        `
        SELECT
            id,
            updated_at
        FROM users
        WHERE id = $1
        LIMIT 1
        `,
        [userId]
    );

    if (!userResult.rows.length) {
        throw new Error("USER_NOT_FOUND");
    }

    const user = userResult.rows[0];

    const tokenTime = new Date(
        tokenIssuedAt * 1000
    );

    if (
        user.updated_at &&
        new Date(user.updated_at) > tokenTime
    ) {
        throw new Error("INVALID_RESET_TOKEN");
    }

    const passwordHash = await bcrypt.hash(
        password,
        12
    );

    await pool.query(
        `
        UPDATE users
        SET
            password_hash = $1,
            updated_at = NOW()
        WHERE id = $2
        `,
        [
            passwordHash,
            userId
        ]
    );

    return true;
}

module.exports = {
  registerUser,
  loginUser,
  requestPasswordReset,
  verifyForgotPasswordCode,
  resetPassword
};