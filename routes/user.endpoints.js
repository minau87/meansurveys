// Imports
const express = require('express');
const userRouter = express.Router();
const User = require('../models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');

// Register a new user
userRouter.post('/', (req, res, next) => {
  // Creating a new User object
  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  });
  // Actually adding the new user
  User.addUser(newUser, (err, user) => {
    if(err){
      // Send error message
      res.json({success: false, msg: 'Failed to register new user.'});
    } else {
      // Send success message and user ID for later use
      res.json({success: true, msg: 'New user has been registered.', id: user._id});
    }
  });
  
  // res.send('POSTing a new user');

});

// Getting all the users
userRouter.get('/', (req, res, next) => {
  res.send('GETting all the users')
});

// Get a single user by ID
userRouter.get('/:id', (req, res, next) => {
  res.send(`GETting the user with ID ${req.params.id}`);
});

// Updating an existing user
userRouter.put('/:id', (req, res, next) => {
  res.send(`PUTing an existing user with an ID of ${req.params.id}.`);
});

// Deleting an existing user
userRouter.delete('/:id', (req, res, next) => {
  res.send(`DELETEing an existing user with an ID of ${req.params.id}.`);
});

module.exports = userRouter;