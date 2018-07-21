// Imports
const express = require('express');
const router = express.Router();

// Register a new user
router.post('/', (req, res, next) => {
 res.send('POSTing a new user');
});

// Getting all the users
router.get('/', (req, res, next) => {
  res.send('GETting all the users')
});

// Get a single user by ID
router.get('/:id', (req, res, next) => {
  res.send(`GETting the user with ID ${req.params.id}`);
});

// Updating an existing user
router.put('/:id', (req, res, next) => {
  res.send(`PUTing an existing user with an ID of ${req.params.id}.`);
});

// Deleting an existing user
router.delete('/:id', (req, res, next) => {
  res.send(`DELETEing an existing user with an ID of ${req.params.id}.`);
});

module.exports = router;