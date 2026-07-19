const express = require("express");
const path = require("path");

const app = express();

// Set true to x-forwarded-for
app.set("trust proxy", true);

// Body Parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static Folder
app.use(express.static(path.join(__dirname, "public")));

// View Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Router
require('dotenv').config();
require("./routes/route")(app);


(async () => {

    app.listen(process.env.PORT, () => {
        console.log(`Server running: http://localhost:${process.env.PORT}`);
    });

})();
