import { Component, OnInit } from '@angular/core';
import { Survey, Question, AnswerPossibility, SurveyResponse } from '../models/survey.model';
import { AuthService } from '../services/auth.service';
import { SurveyService } from '../services/survey.service';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-survey',
  templateUrl: './create-survey2.component.html',
  styleUrls: ['./create-survey2.component.scss']
})
export class CreateSurveyComponent implements OnInit {

  constructor(
    private _authService: AuthService,
    private _surveyService: SurveyService,
    private _fb: FormBuilder,
    private _router: Router
  ) { }

  // Form for adding answer possibilities
  addAnswerForm: FormGroup;
  answerItems;

  // Slide toggle configuration
  toggleConfig = {
    color: 'primary',
    checked: false,
    disabled: false
  };
  isLimitedSurvey = false;

  // Slider configuration
  sliderConfig = {
    min: 1,
    max: 30,
    stepSize: 1,
    thumbLabel: true,
    color: 'primary'
  };

  questionTypes = [
    { label: 'Text', value: 'text' },
    { label: 'Single', value: 'single' },
    { label: 'Multiple', value: 'multiple' }
  ];
  currentQuestion = 0;
  currentQuestionType = '';

  survey: Survey;

  daysSurveyLasts = 1;

  ngOnInit() {
    this.survey = {
      name: '',
      creator: {
        userId: this._authService.getUser()._id,
        username: this._authService.getUser().username,
        email: this._authService.getUser().email
      },
      isLimited: false,
      startDate: new Date(),
      endDate: undefined,
      participantsCount: 0,
      questions: [],
      answers: []
    };
  }

  addQuestion() {
    this.currentQuestionType = null;
    const question: Question = {
      questionType: '',
      question: '',
      answerPossibilities: []
    };
    this.survey.questions.push(question);
    this.currentQuestion = this.survey.questions.length - 1;
  }

  addAnswerPossibility() {

  }

  createSurvey() {
    this._surveyService.createSurvey(this.survey).subscribe((res) => {
      if(res){
        console.log('response:', res);
        // Navigate to survey details when creation was successful
        this._router.navigate(['/survey', res._id]);
      } else {
        console.log('No response received.')
      }
    }, (err) => {
      if(err){
        console.log('an error occured:', err);
      }
    })
  }

  checkSurveyValidity(){
    if(!this.survey.questions || this.survey.questions.length == 0) {
      return true;
    }
    if(!this.survey.name || this.survey.name.length == 0) {
      return true;
    }
    return false;
  }

  setType($event) {
    console.log($event.value);
    this.currentQuestionType = $event.value;
    this.survey.questions[this.currentQuestion].questionType = this.currentQuestionType;
  }


  onLimitedSurveyValueChange() {
    this.survey.isLimited = this.survey.isLimited ? true : false;
    if (this.survey.isLimited === false) {
      this.survey.endDate = undefined;
    }
  }

  onSurveyDurationChanged($event) {
    let endDate = new Date();
    endDate.setDate(endDate.getDate() + $event.value);
    this.survey.endDate = endDate;
  }

  onQuestionEdited($event) {
    console.log('onQuestionEdited:', $event);
    this.survey.questions[this.currentQuestion] = $event;
  }

  onQuestionTypeChange($event) {
    if ($event === 'text') {
      let answerPossibility: AnswerPossibility = {
        answerPossibility: ''
      };
      this.survey.questions[this.currentQuestion].answerPossibilities[0] = answerPossibility;
      this.survey.questions[this.currentQuestion].answerPossibilities.forEach((answer, index) => {
        if (index !== 0) {
          this.survey.questions[this.currentQuestion].answerPossibilities.pop();
        }
      });
    }
    this.survey.questions[this.currentQuestion].questionType = $event;
  }

  onAnswerAdded($event) {
    this.survey.questions[this.currentQuestion].answerPossibilities.push($event);
  }

  onTextAnswerAdded($event) {
    // Check if question type has changed later. If that's the case, delete every
    // answer possibility, except the first one.
    if (
      this.survey.questions[this.currentQuestion].answerPossibilities.length > 1
      && this.survey.questions[this.currentQuestion].questionType === 'text') {

      this.survey.questions[this.currentQuestion].answerPossibilities.forEach((answer, index) => {
        if (index !== 0) {
          this.survey.questions[this.currentQuestion].answerPossibilities.pop();
        }
      });
    }
    this.survey.questions[this.currentQuestion].answerPossibilities[0].answerPossibility = $event;
  }

}
