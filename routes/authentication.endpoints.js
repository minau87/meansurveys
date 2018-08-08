// Imports
const express = require('express');
const authRouter = express.Router();
const User = require('../models/user');
const dbconfig = require('../config/database');
const jwt = require('jsonwebtoken');

// Register a new user
authRouter.post('/', (req, res, next) => {
  // Get username and password that are being submitted
  const username = req.body.username;
  const password = req.body.password;

  // Get the user by ID
  User.getUserByUsername(username, (err, user) => {
    // If there is an error, throw the error
    if (err) throw err;
    // If there was no user found, send a message
    if (!user) {
      return res.json({
        success: false,
        msg: 'User was not found.'
      })
    }
    // If the user exists, match the passwords
    User.comparePassword(password, user.password, (err, isMatch) => {
      // If there is an error comparing the password, throw the error
      if (err) throw err;
      if (isMatch) {
        // Creating the token to be sent to the client
        // Has to be included in the header for each request on protected ressources
        const token = jwt.sign({
          data: user
        }, dbconfig.secret, {
          expiresIn: 604800 // 1 week
        });
        // If the password matches, send the following response
          // If the user is an admin
        if (user.role && user.role === 'admin') {
          res.json({
            success: true,
            token: 'JWT ' + token,
            user: {
              _id: user._id,
              name: user.name,
              email: user.email,
              username: user.username,
              profilePicture: user.profilePicture,
              role: user.role
            }
          });
        } else {
          res.json({
            success: true,
            token: 'JWT ' + token,
            user: {
              _id: user._id,
              name: user.name,
              email: user.email,
              username: user.username,
              profilePicture: user.profilePicture
            }
          });
        }
      } else {
        // If the password doesn't match, send the following response
        return res.json({
          success: false,
          msg: 'Wrong password.'
        })
      }
    })
  })
});

module.exports = authRouter;