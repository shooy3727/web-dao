const router = require("express").Router();

const guestAuthMiddleware = require("../middlewares/guest.middleware");


router.get(
    "/start",
    guestAuthMiddleware,
    (req,res)=>{


        // Chưa login
        if(!req.user){

            return res.redirect("/auth");

        }

        // Login rồi nhưng chưa Telegram
        if(!req.user.telegram_verified){

          return res.redirect("/telegram/verify-telegram");

        }

        // Login + Telegram OK

        return res.redirect("/dashboard");


    }
);


module.exports = router;