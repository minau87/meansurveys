// Defines the models representing a survey and all other relevant interfaces

export interface Survey {
  _id?: String;
  endDate: Date;
  name: String;
  creator: Creator;
  isLimited: Boolean;
  startDate: Date;
  participantsCount: Number;
  participants?: String[];
  questions: Question[];
  answers: Answer[];
}

export interface Creator {
  userId: String;
  username: String;
  email: String;
}

export interface Question {
  questionId?: Number;
  questionType: String;
  question: String;
  answerPossibilities: AnswerPossibility[];
}

export interface AnswerPossibility {
  id?: Number;
  answerPossibility: String;
}

export interface Answer {
  questionId?: Number;
  answers?: any;
}

export interface AnswerSet {
  answers: Answer[];
}

export interface TextAnswer extends Answer {
  text: String;
}

export interface SingleChoiceAnswer extends Answer {
  checked: String;
}

export interface MultipleChoiceAnswer extends Answer {
  checked: Boolean[];
}

export interface ScaleAnswer extends Answer {
  checked: Number;
}

export interface SurveyResponse {
  success: Boolean;
  msg: String;
  _id?: String;
  surveys?: Survey[];
  survey?: Survey;
}
