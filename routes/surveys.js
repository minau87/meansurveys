// Imports
const express = require('express');
const router = express.Router();

// Create a new survey
router.post('/', (req, res, next) => {
  res.send('POSTing a new survey.');
});

// Get all the surveys
router.get('/', (req, res, next) => {
 res.send('GETting all surveys.');
});

// Get a single survey by ID
router.get('/:id', (req, res, next) => {
  res.send(`GETting the survey with ID ${req.params.id}`);
});

// Updating an existing survey
router.put('/:id', (req, res, next) => {
  res.send(`PUTing an existing survey with an ID of ${req.params.id}.`);
});

// Deleting an existing survey
router.delete('/:id', (req, res, next) => {
  res.send(`DELETEing an existing survey with an ID of ${req.params.id}.`);
});

module.exports = router;