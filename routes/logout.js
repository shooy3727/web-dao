const router = require("express").Router();

router.get("/", (req, res) => {

  res.clearCookie("token");

  return res.redirect("/auth");

});

module.exports = router;