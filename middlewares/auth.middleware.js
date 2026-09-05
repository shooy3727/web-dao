const { verifyToken } = require("../utils/jwt");
const pool = require("../database/db");

async function authMiddleware(req, res, next){

  try {

      const token = req.cookies.token;

      if(!token){
        return res.redirect("/auth");
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
        [decoded.id]
      );


      if(result.rows.length === 0){
        return res.redirect("/auth");
      }


      req.user = result.rows[0];

      next();


  } catch(err){

    console.error(err);

    return res.redirect("/auth");

  }

}


module.exports = authMiddleware;