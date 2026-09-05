module.exports = (app) => {

  // API
  app.use("/api/areas", require("./area"));
  app.use("/api/profiles", require("./profile.route"));

  // AUTH / GUEST
  app.use("/auth", require("./auth"));
  app.use("/guest", require("./guest"));

  // TELEGRAM VERIFY
  app.use("/telegram", require("./telegram"));

  // USER PRIVATE
  app.use("/dashboard", require("./dashboard"));
  app.use("/logout", require("./logout"));

  // DASHBOARD ADMIN PRIVATE
  app.use("/dashboard/admin", require("./admin.routes"));

  // DETAIL PAGE
  app.use("/", require("./detail.route"));

  // HOME PAGE
  app.use("/", require("./index"));

};