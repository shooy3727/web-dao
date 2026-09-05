const jwt = require("jsonwebtoken");

function generateToken(user){

  return jwt.sign(
    {
      id: user.id,
      username: user.username,
      role: user.role
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d"
    }
  );
}


function verifyToken(token){

  return jwt.verify(
      token,
      process.env.JWT_SECRET
  );

}

function generatePasswordResetToken({
  userId,
  username
}) {

  return jwt.sign(
      {
          id: userId,
          username,
          purpose: "password_reset"
      },
      process.env.JWT_SECRET,
      {
          expiresIn: "10m"
      }
  );

}


module.exports = {
  generateToken,
  verifyToken,
  generatePasswordResetToken
};