const { verifyToken } = require("../utils/jwt");
const pool = require("../database/db");


async function guestMiddleware(req, res, next){

    try {

        const token = req.cookies.token;

        if(!token){

            req.user = null;

            return next();

        }

        const decoded = verifyToken(token);
        const result = await pool.query(
            `
            SELECT
                id,
                username,
                fullname,
                role,
                telegram_verified,
                telegram_chat_id
            FROM users
            WHERE id = $1
            `,
            [
                decoded.id
            ]
        );


        // Token hợp lệ nhưng user không tồn tại
        if(result.rows.length === 0){

            req.user = null;

            return next();

        }

        req.user = result.rows[0];

        // Đã login + Telegram đã xác thực
        if(req.user.telegram_verified){

            return res.redirect("/dashboard");

        }

        // Đã login nhưng chưa xác thực Telegram
        return res.redirect("/telegram/verify-telegram");

    } catch(err){

        console.log(err);


        // Token lỗi / hết hạn
        // coi như chưa login

        req.user = null;

        return next();

    }

}


module.exports = guestMiddleware;