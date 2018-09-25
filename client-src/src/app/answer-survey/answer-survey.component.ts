import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Survey, SurveyResponse, Answer, MultipleChoiceAnswer, SingleChoiceAnswer, TextAnswer, AnswerSet } from '../models/survey.model';
import { SurveyService } from '../services/survey.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-answer-survey',
  templateUrl: './answer-survey.component.html',
  styleUrls: ['./answer-survey.component.scss']
})
export class AnswerSurveyComponent implements OnInit, OnDestroy {

  survey: Survey;
  loading = true;
  paramsSub: Subscription;
  surveySub: Subscription;
  updateSurveySub: Subscription;
  answers = [];
  currentQuestion = 0;

  @ViewChild('stepper') stepper;

  dataPreviewActive = false;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _surveyService: SurveyService,
    private _authService: AuthService
  ) { }

  ngOnInit() {
    this.paramsSub = this._route.params.subscribe((params) => {
      this.surveySub = this._surveyService.getSurvey(params.id).subscribe((res: SurveyResponse) => {
        // console.log('Survey:', res.survey);
        this.currentQuestion = 0;
        // this.answers.length = res.survey.questions.length;
        // console.log("this.answers.lenght: " + this.answers.length);
        this.survey = res.survey;
        this.createAnswerSet();
        this.loading = false;
      });
    });
  }

  toggleDataPreview() {
    this.dataPreviewActive = this.dataPreviewActive ? false : true;
    // console.log(this.getActiveStep());
    // console.log(this.answers);
  }

  addAnswer() {
    this.currentQuestion = this.getActiveStep();
    console.log('addAnswer(): currentQuestion: ' + this.currentQuestion);
  }

  radioboxValueChanged($event) {
    console.log($event);
    let currentQuestion = this.getActiveStep();
    this.answers[currentQuestion].checked = $event.value;
  }

  checkboxValueChanged($event, i) {
    // console.log('checkBoxValueChanged: $event.checked: ', $event.checked);
    // console.log('checkboxIndex:', i);
    // console.log('this.answers[this.currentQuestion].checked[i]: ' + this.answers[this.currentQuestion].checked[i]);
    // console.log('this.currentQuestion: ' + this.currentQuestion);
    this.answers[this.currentQuestion].checked[i] = $event.checked;
    // This is neccessary in order to check wether or not the checkboxes have been touched
    // this.answers[this.currentQuestion].checked.forEach(element => {
    //   console.log(element);
    //   if(element == undefined) {
    //     element = false;
    //   }
    // });
    for (let j = 0; j < this.answers[this.currentQuestion].checked.length; j++) {
      if (this.answers[this.currentQuestion].checked[j] == undefined) {
        this.answers[this.currentQuestion].checked[j] = false;
      }
    }
    // console.log(this.answers);
  }

  createAnswerSet() {
    this.answers.length = this.survey.questions.length;
    this.survey.questions.forEach((question, qIndex) => {
      if (question.questionType == 'single') {
        let answer: SingleChoiceAnswer = {
          checked: undefined
        };
        // answer.checked = undefined;
        this.answers[qIndex] = answer;
      }
      if (question.questionType == 'multiple') {
        let answer: MultipleChoiceAnswer = {
          checked: []
        };
        // answer.checked = [];
        answer.checked.length = question.answerPossibilities.length;
        for (let i = 0; i < answer.checked.length; i++) {
          answer.checked[i] = undefined;
        }
        console.log('answerSet:', answer);
        this.answers[qIndex] = answer;
      }
      if (question.questionType == 'text') {
        let answer: TextAnswer = {
          text: ''
        };
        // answer.text = '';
        this.answers[qIndex] = answer;
      }
    });
    console.log(this.answers);
  }

  // Returns the currently active step (that is it's index) of the stepper
  getActiveStep() {
    return this.stepper.selectedIndex;
  }

  isStepCompleted(questionIndex) {
    if (this.survey.questions[questionIndex].questionType == 'single') {
      if (this.answers[questionIndex].checked == undefined) {
        return false;
      } else {
        return true;
      }
    }
    if (this.survey.questions[questionIndex].questionType == 'multiple') {
      let isTouched = false;
      // Check later
      this.answers[questionIndex].checked.forEach(element => {
        if (element == undefined) {
          isTouched = false;
        } else {
          isTouched = true;
        }
      });
      return isTouched;
    }
    if (this.survey.questions[questionIndex].questionType == 'text') {
      if (this.answers[questionIndex].text == '') {
        return false;
      } else {
        return true;
      }
    }
  }

  completeSurvey() {
    let answerSet: AnswerSet = {
      answers: this.answers
    };
    let userId = this._authService.getUser()._id;
    let answer = {
      from: userId,
      answerSet: answerSet
    };
    this.updateSurveySub = this._surveyService.updateSurvey(this.survey._id, answer).subscribe((res: SurveyResponse) => {
      // console.log('Response:', res);
      if (!res.success) {
        console.log(res.msg);
      } else {
        this._router.navigate(['/survey', this.survey._id]);
      }
      
    }, (err) => {
      if (err) {
        console.log('Error:', err)
      }
    })
  }

  ngOnDestroy() {
    this.paramsSub.unsubscribe();
    this.paramsSub = undefined;
    this.surveySub.unsubscribe();
    this.surveySub = undefined;
    this.updateSurveySub.unsubscribe();
    this.updateSurveySub = undefined;
  }

}
