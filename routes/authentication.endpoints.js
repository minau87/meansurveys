// Imports
const express = require('express');
const authenticationRouter = express.Router();

// Register a new user
authenticationRouter.post('/user/:id', (req, res, next) => {
 res.send(`Authenticating user with ID ${req.params.id}`);
});

module.exports = authenticationRouter;