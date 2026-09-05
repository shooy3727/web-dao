// Node version 18.20.18
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const dns = require("dns");

dns.setDefaultResultOrder("ipv4first");

const app = express();

// Set true to x-forwarded-for
app.set("trust proxy", true);

// Body Parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Cookies Parser
app.use(cookieParser());

// Static Folder
app.use(express.static(path.join(__dirname, "public")));

// View Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// CANONICAL Dymamic domain
app.use((req, res, next) => {
  res.locals.siteUrl = req.protocol + "://" + req.get("host");
  res.locals.currentUrl = req.originalUrl; // Tự động lấy URL hiện tại cho mọi file EJS
  next();
});

// Router
require('dotenv').config();
require("./routes/route")(app);
require("./utils/telegram.bot");

// 404
app.use((req, res) => {
  res.status(404).render("404");
});


(async () => {

  app.listen(process.env.PORT, () => {
    console.log(`Server running: http://localhost:${process.env.PORT}`);
  });

})();
