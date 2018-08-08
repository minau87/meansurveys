export interface Survey {
  _id: String;
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
  questionId: Number;
  questionType: String;
  questions: String;
  answerPossibilities: AnswerPossibility[];
}

export interface AnswerPossibility {
  id: Number;
  answerPossibility: String;
}

export interface Answer {
  derp: String;
}

export interface SurveyResponse {
  success: Boolean;
  msg: String;
  surveys?: Survey[];
  survey?: Survey;
}
