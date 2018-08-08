const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const dbconfig = require('./database');

module.exports = (passport) => {
  let options = {};
  // Get Token from Authentication Header
  options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  options.secretOrKey = dbconfig.secret;
  console.log(options);
  passport.use(new JwtStrategy(options, (jwt_payload, done) => {
    // console.log("jwt_payload:", jwt_payload);
    // Getting the user
    User.getUserById(jwt_payload.data._id, (err, user) => {
      if(err){
        return done(err, false);
      }
      if(user){
        // If credentials are correct, return the user object
        return done(null, user);
      } else {
        // Return if user not found in database
        return done(null, false);
      }
    });
  }));
};