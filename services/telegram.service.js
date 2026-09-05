const pool = require("../database/db");

// Tạo session xác thực Telegram
async function createVerifySession({
  userId,
  token
}) {

  const result = await pool.query(
    `
    INSERT INTO telegram_verify_sessions
    (
        user_id,
        token,
        expires_at
    )
    VALUES
    (
        $1,
        $2,
        NOW() + INTERVAL '5 minutes'
    )
    RETURNING *
    `,
    [
        userId,
        token
    ]
  );

  return result.rows[0];
}

// Lấy session xác thực theo token
async function findVerifySession(token) {

  const result = await pool.query(
    `
    SELECT
      tvs.id,
      tvs.user_id,
      tvs.token,
      tvs.used,
      tvs.expires_at,
      u.username,
      u.fullname
    FROM telegram_verify_sessions tvs
    INNER JOIN users u
      ON u.id = tvs.user_id
    WHERE tvs.token = $1
      AND tvs.used = FALSE
      AND tvs.expires_at > NOW()
    LIMIT 1
    `,
    [token]
  );

  return result.rows[0] || null;
}

// Xác thực Telegram cho user
async function verifyTelegram({
  userId,
  chatId
}) {

  const result = await pool.query(
    `
    UPDATE users
    SET
      telegram_chat_id = $1,
      telegram_verified = TRUE,
      updated_at = NOW()
    WHERE id = $2
    RETURNING *
    `,
    [
      chatId,
      userId
    ]
  );

  return result.rows[0];
}

// Đánh dấu session đã dùng
async function markSessionUsed(token) {

  await pool.query(
    `
    UPDATE telegram_verify_sessions
    SET used = TRUE
    WHERE token = $1
    `,
    [token]
  );

}

// Tạo mới token
async function findActiveVerifySession(userId) {

    const result = await pool.query(
        `
        SELECT *
        FROM telegram_verify_sessions
        WHERE user_id = $1
          AND used = false
          AND expires_at > NOW()
        ORDER BY created_at DESC
        LIMIT 1
        `,
        [userId]
    );

    return result.rows[0] || null;
}

module.exports = {
  createVerifySession,
  findVerifySession,
  verifyTelegram,
  markSessionUsed,
  findActiveVerifySession
};