// Imports
const express = require('express');
const router = express.Router();

// Register a new user
router.post('/user/:id', (req, res, next) => {
 res.send(`Authenticating user with ID ${req.params.id}`);
});

module.exports = router;