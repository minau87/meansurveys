// Imports
const express = require('express');
const surveyRouter = express.Router();
const Survey = require('../models/survey');
const passport = require('passport');

// Create a new survey (protected)
// surveyRouter.post('/', passport.authenticate('jwt', { session: false }), (req, res, next) => {
surveyRouter.post('/', (req, res, next) => {
  console.log('RQST:', req);
  let newSurvey = new Survey({
    name: req.body.name,
    creator: req.body.creator,
    isLimited: req.body.isLimited,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    participantsCount: 0,
    questions: req.body.questions,
    answers: []
  });
  console.log('newSurvey:', newSurvey);
  // Increment the ID of each question and answerpossibility
  newSurvey.questions.forEach((question, questionIndex) => {
    // Set the questionId to the current questionIndex
    question.questionId = questionIndex;
    question.answerPossibilities.forEach((answerPossibility, apIndex) => {
      // Set the answerPossibility.id to the current apIndex
      answerPossibility.id = apIndex;
    });
  });
  Survey.createSurvey(newSurvey, (err, survey) => {
    if (err) {
      console.log('error:', err);
      // Send an error message when survey could not be created
      res.json({
        success: false,
        msg: 'Survey could not be created.'
      })
    } else {
      // Send success message
      res.json({
        success: true,
        msg: 'Survey created.',
        _id: survey._id
      });
    }
  })
});

// Adds new answers to a survey
surveyRouter.post('/:id', (req, res, next) => {
  console.log('req.params:' + req.params);
  let _id = req.params.id;
  let body = req.body;
  console.log('_id: ' + _id);
  // console.log('answerSet', answerSet);
  // res.json({
  //   succes: true,
  //   msg: 'Answers added.'
  // });

  Survey.findById(_id, (err, survey) => {
    if(err){
      res.json({
        success: false,
        msg: 'An internal error occured. Please try again.'
      })
    }
    // if(!survey){
    //   res.json({
    //     success: false,
    //     msg: 'The survey could not be found.'
    //   })
    // }
    if(survey){
      if(survey.participants.indexOf(body.from) !== -1){
        res.json({
          success: false,
          msg: 'You have already taken part in this survey.'
        })
      } else {
        Survey.addAnswers(_id, body, {}, (err, survey) => {
          if(err) {
            res.json({
              success: false,
              msg: 'Could not add your answers. Please try again.'
            });
          } else {
            res.json({
              success: true,
              msg: 'Your answers have been added. Thank you for participating!',
              modified: survey.nModified
            });
          }
        });        
      }
    }
  });

  // if(survey){
  //   console.log(survey);
  //   if(survey.participants.indexOf(body.from) !== -1) {
  //     res.json({
  //       success: false,
  //       msg: 'You have already taken part in this survey.'
  //     })
  //   }
  // }
  // Survey.addAnswers(_id, body, {}, (err, survey) => {
  //   if(err) {
  //     res.json({
  //       success: false,
  //       msg: 'Could not add your answers. Please try again.'
  //     });
  //   } else {
  //     res.json({
  //       success: true,
  //       msg: 'Your answers have been added. Thank you for participating!',
  //       modified: survey.nModified
  //     });
  //   }
  // });
});

// Get all the surveys
surveyRouter.get('/', (req, res, next) => {
  Survey.getSurveys((err, surveys) => {
    if (err) {
      res.json({
        success: false,
        msg: 'Could not get all the surveys.'
      });
    }
    if (surveys) {
      surveys.forEach((survey, index) => {
        // Check wether or not the survey is limited in time or not
        if (survey.isLimited) {
          //  If it's limited, get the current date
          let now = new Date(Date.now());
          // Check wether or not the current date is bigger than the endDate of the survey
          if (now > survey.endDate) {
            console.log(survey.name + ' is expired: Now:' + now + ' | endDate: ' + survey.endDate);
            // If the survey is expired, set the isExpired attribute to true
            survey.isExpired = true;
            // Save the changed document
            survey.save(err => {
              if (err) {
                console.log('Error updating expired document');
              } else {
                console.log('Updating exisiting document successful.');
              }
            })
          } else {
            console.log('Survey not expired.');
          }
        }
      });
      res.json({
        success: true,
        msg: 'Surveys found.',
        surveys: surveys
      });
    }
  });
});

// Get a single survey by ID
surveyRouter.get('/:id', (req, res, next) => {
  let id = req.params.id;
  Survey.getSurveyById(id, (err, survey) => {
    if (err) {
      res.json({
        success: false,
        msg: 'Survey was not found.'
      });
    }
    if (survey) {
      res.json({
        success: true,
        msg: 'Survey found.',
        survey: survey
      });
    }
  });
});

// Updating an existing survey
// Should be used when either updating the survey or
// pushing answers
surveyRouter.put('/:id', (req, res, next) => {
  let id = req.params.id;
  let updates = req.body;
  Survey.updateSurvey(id, updates, {}, (err, survey) => {
    if (err) {
      res.json({
        success: false,
        msg: 'Survey could not be updated.'
      });
    } else {
      res.json({
        success: true,
        msg: 'Survey updated.',
        modified: survey.nModified
      });
    }
  });
});

// Deleting an existing survey
surveyRouter.delete('/:id', (req, res, next) => {
  let surveyId = req.params.id;
  Survey.deleteSurvey(surveyId, (err) => {
    if (err) {
      res.json({
        success: false,
        msg: 'Survey could not be deleted.'
      });
    } else {
      res.json({
        success: true,
        msg: 'Survey deleted successfully.'
      });
    }
  });
});

module.exports = surveyRouter;