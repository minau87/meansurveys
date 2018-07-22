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
    console.log(jwt_payload);
    // Getting the user
    User.getUserById(jwt_payload.data._id, (err, user) => {
      if(err){
        return done(err, false);
      }
      if(user){
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  }));
};