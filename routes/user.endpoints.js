// Imports
const express = require('express');
const userRouter = express.Router();
const User = require('../models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');

// Register a new user
userRouter.post('/', (req, res, next) => {
  User.getUserByUsername(req.body.username, (err, user) => {
    if (err) throw err;
    if (user) {
      res.json({
        success: false,
        msg: 'This username already exists. Please choose a different username.'
      })
    }
  });
  // Creating a new User object
  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  });
  // Actually adding the new user
  User.addUser(newUser, (err, user) => {
    if (err) {
      // Send error message
      res.json({
        success: false,
        msg: 'Failed to register new user.'
      });
    } else {
      // Send success message and user ID for later use
      res.json({
        success: true,
        msg: 'New user has been registered.',
        id: user._id
      });
    }
  });
});

// Getting all the users
userRouter.get('/', (req, res, next) => {
  User.getUsers((err, users) => {
    if (err) {
      // Send error message
      res.json({
        success: false,
        msg: 'No users found.'
      });
    }
    if (users) {
      res.json({
        success: true,
        msg: 'Users found.',
        users: users
      });
    }
  });
});

// Get a single user by ID
userRouter.get('/:id', (req, res, next) => {
  res.send(`GETting the user with ID ${req.params.id}`);
});

// Updating an existing user
userRouter.put('/:id', (req, res, next) => {
  let userId = req.params.id;
  let updates = req.body;
  User.updateUser(userId, updates, {}, (err, user) => {
    if (err) {
      res.json({
        success: false,
        msg: 'Could not update user.'
      });
    } else {
      res.json({
        success: true,
        msg: 'User updated.',
        modified: user.nModified
      });
    }
  })
});

// Deleting an existing user
userRouter.delete('/:id', (req, res, next) => {
  let userId = req.params.id;
  User.deleteUser(userId, (err) => {
    if (err) {
      res.json({
        success: false,
        msg: 'Could not delete user.'
      });
    } else {
      res.json({
        success: true,
        msg: 'User deleted successfully.'
      });
    }
  });
});

module.exports = userRouter;