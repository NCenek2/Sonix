const express = require("express");
// const keys = require("./config/keys");
// const passport = require("passport");
// const cookieSession = require("cookie-session");
// const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
// require("./models/User");
// require("./models/Posts");
// mongoose.connect(keys.mongoURI);
// require("./services/passport");

const app = express();
// "heroku-postbuild": "NPM_CONFIG_PRODUCTION=false npm install --prefix client && npm run build --prefix client"
app.get("/", (req, res) => {
  res.send("BENNY WAS HERE");
});
// app.use(bodyParser.json());
// app.use(
//   cookieSession({
//     maxAge: 30 * 24 * 60 * 60 * 1000,
//     keys: [keys.cookieKey],
//   })
// );

// app.use(passport.initialize());
// app.use(passport.session());

// require("./routes/authRoutes")(app);
// require("./routes/soxRoutes")(app);

// if (process.env.NODE_ENV === "production") {
//   // Express with serve up production assests
//   // like our main.js file, or main.css file!
//   app.use(express.static("client/build"));
//   // See if some file is in client/build

//   // Expres will serve up the index.html file
//   // if it doesn't recognize the rout
//   const path = require("path");
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//   });
// }
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log("Welcome User"));
