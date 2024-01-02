const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const User = mongoose.model("users");
const keys = require("../config/keys");

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
  let user = await User.findById(id);
  done(null, user);
  // Case to add where cookie is tampered with? If not user?
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      let user = await User.findOne({ googleId: profile.id });
      if (!user) {
        console.log("User not found");
        user = await new User({
          googleId: profile.id,
          name: profile._json.name || "Unknown",
          // Should i do null checking on profile?._json?.name ??
        }).save();
      } else {
        console.log("User already exists");
      }
      done(null, user);
    }
  )
);
