const TelegramBot = require("node-telegram-bot-api");
const telegramService = require('../services/telegram.service');


const bot = new TelegramBot(
    process.env.TELEGRAM_BOT_TOKEN,
    {
        polling: true
    }
);

bot.onText(/\/start (.+)/, async (msg, match) => {

    const token = match[1];
    const session = await telegramService.findVerifySession(token);

    if (!session) {
      await bot.sendMessage(
        msg.chat.id,
        "❌ Liên kết đã hết hạn hoặc không hợp lệ.\n\nVui lòng quay lại website để tạo yêu cầu mới."
      );
      return;
    }

    try {
      await bot.sendMessage(msg.chat.id,
      `
      🎉 Xin chào ${msg.from.first_name}
      Bạn muốn liên kết Telegram này với CineVerse?
      Nhấn nút bên dưới để xác nhận.
          `,
          {
              reply_markup: {
                  inline_keyboard: [
                      [
                          {
                            text: "✅ Xác nhận liên kết",
                            callback_data: token
                          }
                      ]
                  ]
              }
          }
      );
    } catch(err) {
      
      if (err.response?.statusCode === 403) {
        console.log(`User ${msg.chat.id} đã block bot.`);
        return;
      }

      console.error(err);

    }

});

// Telegram Callback
bot.on("callback_query", async (query) => {

    try {

        const token = query.data;

        // Kiểm tra session
        const session = await telegramService.findVerifySession(token);

        if (!session) {

            await bot.answerCallbackQuery(query.id, {
                text: "❌ Liên kết đã hết hạn hoặc không hợp lệ.",
                show_alert: true
            });

            return;
        }

        // Cập nhật thông tin Telegram cho user
        const user = await telegramService.verifyTelegram({
            userId: session.user_id,
            chatId: query.message.chat.id
        });

        // Đánh dấu token đã sử dụng
        await telegramService.markSessionUsed(token);

        // Tắt loading + hiện popup nhỏ
        await bot.answerCallbackQuery(query.id, {
            text: "✅ Xác thực thành công!",
            show_alert: false
        });

        // Thay nội dung tin nhắn
        await bot.editMessageText(
`🎉 Liên kết Telegram thành công!

👤 Tài khoản: ${session.username}
📨 Telegram: @${user.telegram_username || "Chưa đặt username"}

✅ Telegram này đã được liên kết với tài khoản CineVerse.

Từ bây giờ bạn có thể sử dụng Telegram để:

• Quên mật khẩu
• Đổi mật khẩu
• Mở khóa tài khoản

❤️ Cảm ơn bạn đã sử dụng CineVerse!`,
            {
                chat_id: query.message.chat.id,
                message_id: query.message.message_id
            }
        );

    } catch (err) {

        console.error(err);

        try {

            await bot.answerCallbackQuery(query.id, {
                text: "❌ Có lỗi xảy ra, vui lòng thử lại.",
                show_alert: true
            });

        } catch (_) {}

    }

});

// Gửi OTP Forgot Password
async function sendPasswordResetCode({
  chatId,
  code
}) {

  try {

    await bot.sendMessage(
      chatId,
      `🔐 *Đặt lại mật khẩu CineVerse*

    Mã xác nhận của bạn là:

    🔢 *${code}*

    ⏳ Mã này sẽ mất hiệu lực nếu sai trong 3 lần thử.

    ⏳ Mã này sẽ hết hạn sau 5 phút.

    ⚠️ Không chia sẻ mã này cho bất kỳ ai.`,
      {
        parse_mode: "Markdown"
      }
    );

    return true;

  } catch (err) {

    if (err.response?.statusCode === 403) {
      console.log(`User ${chatId} đã block bot.`);
      return false;
    }

    console.error(
      "Lỗi gửi Forgot Password OTP:",
      err
    );

    return false;
  }

}

module.exports = {
    bot,
    sendPasswordResetCode
};