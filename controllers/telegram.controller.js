const telegramService = require('../services/telegram.service')

const botU = process.env.BOT_USERNAME;

// Verify telegram
const crypto = require("crypto");

async function verifyTelegram(req,res){

  // Đã xác thực Telegram
  if(req.user.telegram_verified){

    return res.redirect("/dashboard");

  }

  let session = await telegramService.findActiveVerifySession(req.user.id);

  if (!session) {

      const token = crypto.randomBytes(32).toString("hex");

      session = await telegramService.createVerifySession({
        userId: req.user.id,
        token
      });

  }

  const telegramLink =
    `tg://resolve?domain=${process.env.TELEGRAM_BOT_USERNAME}&start=${session.token}`;

  res.render("telegram", {
    user:req.user,
    telegramLink
  });

}

module.exports = {
  verifyTelegram
};