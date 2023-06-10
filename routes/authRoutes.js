const passport = require("passport");
const requireLogin = require("../middlewares/requireLogin");

module.exports = (app) => {
  app.get("/", (req, res) => {
    console.log("redirecting to home");
    if (!req.user) res.redirect("/homePage");
    console.log("redirecting to posts");
    res.redirect("/posts");
  });

  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
    })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      res.redirect("/posts");
    }
  );

  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });

  app.get("/api/logout", requireLogin, (req, res) => {
    req.logout();
    res.redirect("/homePage");
  });
};
