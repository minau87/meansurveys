export interface Survey {
  _id?: String;
  endDate: Date;
  name: String;
  creator: Creator;
  isLimited: Boolean;
  startDate: Date;
  participantsCount: Number;
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
  id?: Number;
  // derp: String;
}

export interface TextAnswer extends Answer {
  text: String;
}

export interface SingleChoiceAnswer extends Answer {
  checked: Number;
}

export interface MultipleChoiceAnswer extends Answer {
  checked: Number[];
}

export interface ScaleAnswer extends Answer {
  checked: Number;
}

export interface SurveyResponse {
  success: Boolean;
  msg: String;
  surveys?: Survey[];
  survey?: Survey;
}
