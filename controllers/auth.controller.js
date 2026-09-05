const jwt = require("jsonwebtoken");
const pool = require("../database/db");
const authService = require("../services/auth.service");
const {
  generateToken,
  generatePasswordResetToken
} = require("../utils/jwt");

// Render trang đăng nhập / đăng ký
async function showAuth(req, res) {
    res.render("auth", {
        success: null,
        loginError: null,
        registerError: null,
        activeTab: "login"
    });
}

//=========== Đăng ký =============
async function register(req, res) {
    
    try {

        await authService.registerUser(req.body);

        return res.render("auth", {
            success: "Đăng ký thành công! Vui lòng đăng nhập để tiến hành xác thực Telegram.",
            loginError: null,
            registerError: null,
            activeTab: "login"
        });

    } catch (err) {

        let message = "Có lỗi xảy ra.";

        switch (err.message) {

            case "FULLNAME_REQUIRED":
                message = "Vui lòng nhập họ tên.";
                break;

            case "TELEGRAM_REQUIRED":
                message = "Vui lòng nhập Telegram.";
                break;

            case "INVALID_TELEGRAM":
                message = "Telegram không hợp lệ.";
                break;

            case "USERNAME_REQUIRED":
                message = "Vui lòng nhập username.";
                break;

            case "INVALID_USERNAME":
                message = "Username không hợp lệ.";
                break;

            case "USERNAME_EXISTS":
                message = "Username đã tồn tại.";
                break;

            case "TELEGRAM_EXISTS":
                message = "Telegram đã được sử dụng.";
                break;

            case "PASSWORD_REQUIRED":
                message = "Vui lòng nhập mật khẩu.";
                break;

            case "PASSWORD_TOO_SHORT":
                message = "Mật khẩu phải có ít nhất 8 ký tự.";
                break;

            case "CONFIRM_PASSWORD_REQUIRED":
                message = "Vui lòng nhập lại mật khẩu.";
                break;

            case "PASSWORD_NOT_MATCH":
                message = "Mật khẩu không trùng khớp.";
                break;
        }

        return res.render("auth", {
            success: null,
            loginError: null,
            registerError: message,
            activeTab: "register"
        });

    }

}

// Login User
async function login(req, res) {

    try {

        const user = await authService.loginUser(req.body);
        const token = generateToken(user);

        res.cookie(
            "token",
            token,
            {
                httpOnly: true,
                secure: false,
                sameSite: "lax",
                maxAge: 7 * 24 * 60 * 60 * 1000
            }
        );

        if (user.role === "admin") {
            return res.redirect("/dashboard/admin");
        }

        if (!user.telegram_verified) {
            return res.redirect("/telegram/verify-telegram");
        }

        return res.redirect("/dashboard");

    } catch(err) {

        let message = "Có lỗi xảy ra.";

        switch(err.message) {

            case "USERNAME_REQUIRED":
                message = "Vui lòng nhập username.";
                break;

            case "PASSWORD_REQUIRED":
                message = "Vui lòng nhập mật khẩu.";
                break;

            case "INVALID_LOGIN":
                message = "Username hoặc mật khẩu không chính xác.";
                break;
        }

        return res.render("auth", {
            success: null,
            loginError: message,
            registerError: null,
            activeTab: "login"
        });

    }

}

// Render trang quên mk
async function forgotPasswordPage(req, res) {
    res.render("forgot-password", {
      success: null,
      error: null,
      step: "request",
      username: null
    });

}

// Nhập username trang quên mk
async function forgotPassword(req, res) {

    try {

      const { username } = req.body;
      const resetData = await authService.requestPasswordReset({username});

      return res.render("forgot-password", {
        success: "Mã xác nhận đã được gửi tới Telegram của bạn.",
        error: null,
        step: "verify",
        username: resetData.username
      });

    } catch (err) {

        let message = "Có lỗi xảy ra.";
        let step = "request";
        let remainingSeconds = null;

        switch (err.message) {

            case "USERNAME_REQUIRED":
                message = "Vui lòng nhập username.";
                break;

            case "USER_NOT_FOUND":
                message = "Không tìm thấy tài khoản.";
                break;

            case "TELEGRAM_NOT_VERIFIED":
                message = "Tài khoản chưa liên kết Telegram.";
                break;

            case "OTP_TOO_FAST":
                message =
                  `Mã trước đó vẫn còn hiệu lực. Vui lòng chờ ${
                    err.remainingSeconds || 90
                  } giây trước khi yêu cầu mã mới.`;

                step = "verify";
                break;

            case "OTP_RATE_LIMIT":
                message =
                  "Bạn đã yêu cầu quá nhiều mã xác nhận. Vui lòng thử lại sau 30 phút.";

                step = "request";
                break;

            case "OTP_FAILED_COOLDOWN":
                message = "Bạn đã nhập sai mã xác nhận quá 3 lần.";
                remainingSeconds = err.remainingSeconds;
                step = "request";
                break;

            case "TELEGRAM_SEND_FAILED":
                message =
                    "Không thể gửi mã xác nhận qua Telegram lúc này. Vui lòng thử lại sau.";
                step = "request";
                break;
        }

        return res.render("forgot-password", {
            success: null,
            error: message,
            step,
            username: req.body.username,
            remainingSeconds
        });
    }

}

// Verify Forgot Password OTP
async function verifyForgotPassword(req, res) {

  try {

    const {
      username,
      code
    } = req.body;

    const result = await authService.verifyForgotPasswordCode({
      username,
      code
    });

    const resetToken = generatePasswordResetToken({
      userId: result.userId,
      username: result.username
    });

    return res.redirect(
      `/auth/reset-password?token=${encodeURIComponent(resetToken)}`
    );

  } catch (err) {

    let message = "Có lỗi xảy ra.";
    let step = "verify";
    let remainingSeconds = null;

    switch (err.message) {

        case "USERNAME_REQUIRED":
            message = "Vui lòng nhập username.";
            break;

        case "USER_NOT_FOUND":
            message = "Không tìm thấy tài khoản.";
            break;

        case "OTP_REQUIRED":
            message = "Vui lòng nhập mã xác nhận.";
            break;

        case "OTP_INVALID":
            message = "Mã xác nhận phải gồm 6 chữ số.";
            break;

        case "OTP_NOT_FOUND":
            message = "Không tìm thấy mã xác nhận. Vui lòng yêu cầu mã mới.";
            break;

        case "OTP_EXPIRED":
            message = "Mã xác nhận đã hết hạn. Vui lòng gửi lại mã mới.";
            break;

        case "OTP_WRONG":
            message = `Mã xác nhận không chính xác. Bạn còn ${err.remainingAttempts} lần thử.`;
            break;

        case "OTP_ALREADY_USED":
            message = "Mã xác nhận này đã được sử dụng.";
            break;

        case "OTP_TOO_MANY_ATTEMPTS":
            // Lấy số lần OTP đã bị khóa
            const failedOtpResult = await pool.query(
                `
                SELECT COUNT(*) AS count
                FROM verification_codes
                WHERE user_id = (
                    SELECT id
                    FROM users
                    WHERE username = $1
                    LIMIT 1
                )
                AND type = 'forgot_password'
                AND attempts >= max_attempts
                AND verified_at IS NOT NULL
                `,
                [req.body.username]
            );

            const failedCount = Number(
                failedOtpResult.rows[0].count
            );

            let cooldownSeconds;

            if (failedCount === 1) {

                cooldownSeconds = 30;

            } else if (failedCount === 2) {

                cooldownSeconds = 60;

            } else {

                cooldownSeconds = (failedCount - 2) * 5 * 60;
            }

            message = "Bạn đã nhập sai quá 3 lần. Mã xác nhận đã hết hiệu lực.";
            remainingSeconds = cooldownSeconds;
            step = "verify";
            break;

    }

    return res.render("forgot-password", {
      success: null,
      error: message,
      step: step,
      username: req.body.username,
      remainingSeconds
    });
  }
}

// Reset Password Page
async function resetPasswordPage(req, res) {

    const { token } = req.query;

    if (!token) {
      return res.redirect("/auth/forgot-password");
    }

    try {

      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );

      if (decoded.purpose !== "password_reset") {
        throw new Error("INVALID_RESET_TOKEN");
      }

      return res.render("reset-password", {
        token
      });

    } catch (err) {

      return res.render("forgot-password", {
          success: null,
          error: "Liên kết đặt lại mật khẩu không hợp lệ hoặc đã hết hạn.",
          step: "request",
          username: null
      });

    }

}

// Reset Password verify
async function resetPassword(req, res) {

  try {

      const {
          token,
          password,
          confirm_password
      } = req.body;

      if (!token) {
          throw new Error("INVALID_RESET_TOKEN");
      }

      let decoded;

      try {

          decoded = jwt.verify(
              token,
              process.env.JWT_SECRET
          );

      } catch (err) {

          throw new Error("INVALID_RESET_TOKEN");

      }

      if (decoded.purpose !== "password_reset") {
          throw new Error("INVALID_RESET_TOKEN");
      }

        await authService.resetPassword({
            userId: decoded.id,
            tokenIssuedAt: decoded.iat,
            password,
            confirm_password
        });

        return res.render("auth", {
            success: "Đổi mật khẩu thành công! Vui lòng đăng nhập bằng mật khẩu mới.",
            loginError: null,
            registerError: null,
            activeTab: "login"
        });

  } catch (err) {

      let message = "Có lỗi xảy ra.";

      switch (err.message) {

          case "INVALID_RESET_TOKEN":
              message =
                  "Liên kết đặt lại mật khẩu không hợp lệ hoặc đã hết hạn.";
              break;

          case "PASSWORD_REQUIRED":
              message =
                  "Vui lòng nhập mật khẩu mới.";
              break;

          case "CONFIRM_PASSWORD_REQUIRED":
              message =
                  "Vui lòng nhập lại mật khẩu.";
              break;

          case "PASSWORD_TOO_SHORT":
              message =
                  "Mật khẩu phải có ít nhất 8 ký tự.";
              break;

          case "PASSWORD_NOT_MATCH":
              message =
                  "Mật khẩu không trùng khớp.";
              break;

          case "USER_NOT_FOUND":
              message =
                  "Tài khoản không tồn tại.";
              break;
      }

      return res.render("reset-password", {
          token: req.body.token,
          error: message,
          success: null
      });

  }

}

module.exports = {
  showAuth,
  forgotPasswordPage,
  forgotPassword,
  verifyForgotPassword,
  resetPasswordPage,
  resetPassword,
  register,
  login
};