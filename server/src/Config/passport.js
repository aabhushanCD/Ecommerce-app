import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../Models/User.model.js";
import dotenv from "dotenv";

dotenv.config();

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL,
}, async (accessToken, refreshToken, profile, done) => {
  try {
    // Find or create user based on Google profile ID
    let user = await User.findOne({ googleId: profile.id });
    if (!user) {
      // Create a new user record using info from Google profile
      user = await User.create({
        googleId: profile.id,
        name: profile.displayName,
        email: profile.emails?.[0]?.value || "",
        // No password for Google OAuth users; you may set a placeholder or leave undefined
        password: "",
        imageUrl: profile.photos?.[0]?.value,
        isVerified: true,
      });
    }
    return done(null, user);
  } catch (err) {
    return done(err, null);
  }
}));

// Serialize user ID into session (not used for JWT but required by passport)
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

export default passport;
