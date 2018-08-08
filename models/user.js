/**
 * This file contains the user model.
 */

// Imports
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// User Schema
const userSchema = mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    require: true
  },
  role: {
    type: String
  },
  profilePicture: {
    type: String
  }
});

// Making the Schema available. Parameters: Schemaname (String), Schema specified above
const User = module.exports = mongoose.model('User', userSchema);

// Adding a new user
module.exports.addUser = (newUser, callback) => {
  // Generate salt
  bcrypt.genSalt(10, (err, salt) => {
    // Encrypt the password
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      // Set the users password to the hash value
      newUser.password = hash;
      newUser.save(callback);
    });
  });
};

// Getting all the users
module.exports.getUsers = (callback) => {
  // Send back all the user info, except the password
  User.find(callback).select({password: 0});
};

// Getting a single user by his ID
module.exports.getUserById = (id, callback) => {
  User.findById(id, callback);
};

// Getting a single user by his username
module.exports.getUserByUsername = (username, callback) => {
  const selector = {username: username};
  User.findOne(selector, callback);
};

// Updating an exisiting user (Don't forget to send Content-Type application/json along)
module.exports.updateUser = (id, user, options, callback) => {

  const selector = {
    _id: id
  };

  const modifier = { $set : {} };
  // modifier.$set = user;
  // const image = new Buffer(user.imageBase64, 'base64');
  modifier.$set = { "profilePicture" : user.imageBase64};

  User.update(selector, modifier, options, callback);
};

// Deleting a user
module.exports.deleteUser = (id, callback) => {
  const selector = {
    _id : id
  };
  User.deleteOne(selector, callback);
};

// UTILITIES

// Comparing a submitted password with the password hash for a user
module.exports.comparePassword = (candidatePassword, hash, callback) => {
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if (err) throw err;
    callback(null, isMatch);
  });
};