const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/UserModel');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // 1. Search for the user by email
      const user = await User.findOne({ email: profile.emails[0].value });

      
      if (!user) {
        // 2. If user doesn't exist, do NOT create them.
        // Pass 'false' and an error message to Passport.
        return done(null, false, { message: 'No account found with this email. Please register first.' });
      }

    

      return done(null, user);
    } catch (err) {
      return done(err, null);
    }
  }
));