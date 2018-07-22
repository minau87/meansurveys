// Imports
const express = require('express');
const surveyRouter = express.Router();

// Create a new survey
surveyRouter.post('/', (req, res, next) => {
  res.send('POSTing a new survey.');
});

// Get all the surveys
surveyRouter.get('/', (req, res, next) => {
 res.send('GETting all surveys.');
});

// Get a single survey by ID
surveyRouter.get('/:id', (req, res, next) => {
  res.send(`GETting the survey with ID ${req.params.id}`);
});

// Updating an existing survey
surveyRouter.put('/:id', (req, res, next) => {
  res.send(`PUTing an existing survey with an ID of ${req.params.id}.`);
});

// Deleting an existing survey
surveyRouter.delete('/:id', (req, res, next) => {
  res.send(`DELETEing an existing survey with an ID of ${req.params.id}.`);
});

module.exports = surveyRouter;