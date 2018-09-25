/**
 * This file contains the survey model.
 */

// Imports
const mongoose = require('mongoose');

// Schema for the creator of a survey. Could be fetched again, but decided to store with survey
const creatorSchema = mongoose.Schema({
  userId: {
    type: String
  },
  username: {
    type: String
  },
  email: {
    type: String
  }
}, {
    _id: false
  });

// Schema for a single question
const questionSchema = mongoose.Schema({
  // Increment this with every API hit: { $inc: { answers.$.questionId: 1 } }
  questionId: {
    type: Number,
    default: 0
  },
  questionType: {
    type: String,
    enum: ['text', 'single', 'multiple'], // Free text, single choice, multiple choice
    required: true
  },
  question: {
    type: String,
    required: true
  },
  answerPossibilities: [{
    // Increment this with every API hit: { $inc: { answers.$.answerPossibilities.$.id: 1 } }
    id: {
      type: Number
    },
    answerPossibility: {
      type: String
    },
    _id: false
  }]
}, {
    _id: false
  });

// Schema for an answer
// const answerSchema = mongoose.Schema({
//   forQuestion: {
//     type: Number
//   },
//   answers: [{
//     type: mongoose.Schema.Types.Array
//   }]
// }, {
//   _id: false
// });

const answerSchema = mongoose.Schema({
  // forQuestion: {
  //   type: Number
  // },
  answers: [{
    type: Object
  }]
})

// Schema for a survey
const surveySchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  creator: creatorSchema,
  isLimited: {
    type: Boolean,
    reqired: true
  },
  startDate: {
    type: Date,
    default: Date.now()
  },
  // Specify a date or don't. If it's not specified, the survey is NOT limited
  endDate: {
    type: Date,
    default: Date.now() + (7 * 24 * 60 * 60 * 1000)
  },
  // Increment this with every API hit: { $inc: { participantsCount: 1 } }
  participantsCount: {
    type: Number
  },
  participants: {
    type: [String]
  },
  // Wether or not the survey is expired
  isExpired: {
    type: Boolean,
    default: false
  },
  questions: [questionSchema],
  answers: []
  // answers: {
  //   type: Object
  // }
});

// Making the Schema available outside of this module
const Survey = module.exports = mongoose.model('Survey', surveySchema);

/**
 * CREATE:
 * Creating a new survey
 */
module.exports.createSurvey = (survey, callback) => {
  Survey.create(survey, callback)
};

/**
 * READ:
 * Getting all the surveys
 */
module.exports.getSurveys = (callback) => {
  Survey.find(callback);
};

/**
 * READ:
 * Getting a single survey by ID
 */
module.exports.getSurveyById = (id, callback) => {
  Survey.findById(id, callback);
};

/**
 * UPDATE:
 * Updating a survey
 */
module.exports.updateSurvey = (id, survey, options, callback) => {
  const selector = {
    _id: id
  };

  let s = Survey.findById(id);
  if (!survey) {
    throw err
  }

  // Don't overwrite the entire survey and push answers to already exisiting answers if neccessary
  const modifier = {
    $set: {
      name: survey.name == s.name ? s.name : survey.name,
      isLimited: survey.isLimited == s.isLimited ? s.isLimited : survey.isLimited,
      startDate: survey.startDate == s.startDate ? Date(s.startDate) : Date(survey.startDate),
      endDate: survey.endDate == s.endDate ? Date(s.endDate) : Date(survey.endDate)
    }
  };

  if (survey.answers) {
    if (!survey.answers.length == 0) {
      modifier.$push = {
        answers: survey.answers
      }
    }
  }

  Survey.update(selector, modifier, options, callback);
};

/**
 * Adds new answers to a survey
 */
module.exports.addAnswers = (id, body, options, callback) => {
  const selector = {
    _id: id
  };
  console.log('answerSet', body.answerSet);
  // let a = { answers: answerSet };
  const modifier = {
    $inc: {
      participantsCount: 1
    },
    $push: {
      answers: body.answerSet,
      participants: body.from
    }
  };
  // modifier.$push = answerSet;
  // console.log('modifier: ', modifier);
  Survey.update(selector, modifier, options, callback);
}

/**
 * DELETE:
 * Deleting a survey
 */
module.exports.deleteSurvey = (id, callback) => {

  const selector = {
    _id: id
  };

  Survey.deleteOne(selector, callback);
};