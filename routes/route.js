module.exports = (app) => {

  app.use("/", require("./index"));
  app.use("/api/profiles", require("./profile.route"));
  app.use("/api/areas", require("./area"));
 // Thêm routes ở đây  
};