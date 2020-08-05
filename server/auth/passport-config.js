const { Strategy: LocalStrategy } = require('passport-local');
const bcrypt = require('bcrypt');
const { User } = require('../db/');

// authentication on login: takes the passport module and
// user model to look through 
const passportAuthentication = (passport) => {
  passport.use(
    new LocalStrategy(
      {usernameField: 'email'},
      async (email, password, done) => {
        try {
          // get the user based on their email
          const user = await User.findOne({ email });
          
          // if no user exists by the email provided
          if (!user) {
            return done(null, false, { message: 'No user with that email'});
          }
          
          // if user does exit, compare the typed in password with
          // the user's password.
          // make sure it matches
          const isMatch = await bcrypt.compare(password, user.password);
          
          // if pass matches, return the user
          // else.. incorrect password
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: 'Password incorrect'});
          }
        } catch (err) {
          return done(err);
        }
      }
    )
  );
  
  // store user id inside of the session
  // user id is actually the serialized version of
  // our user
  passport.serializeUser((user, done) => {
    return done(null, user.id);
  });
  // serialize user as a single id
  passport.deserializeUser((id, done) => {
    return done(
      null,
      users.find((user) => user.id === id)
    );
  });

};

module.exports = passportAuthentication;