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
  }
});

// Making the Schema available. Parameters: monoogse.model('Name for the schema', Schema specified above)
const User = module.exports = mongoose.model('User', userSchema);

module.exports.getUserById = (id, callback) => {
  User.findById(id, callback);
};

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