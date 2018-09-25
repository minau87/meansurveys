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
        this.currentQuestion = 0;
        this.survey = res.survey;
        this.createAnswerSet();
        this.loading = false;
      });
    });
  }

  // Toggles the data preview
  toggleDataPreview() {
    this.dataPreviewActive = this.dataPreviewActive ? false : true;
  }

  // Switches to the next question of the survey
  addAnswer() {
    this.currentQuestion = this.getActiveStep();
  }

  // Reacts to changes to answers where the questionType is 'single'
  radioboxValueChanged($event) {
    let currentQuestion = this.getActiveStep();
    this.answers[currentQuestion].checked = $event.value;
  }

  // Reacts to changes to answers where the questionType is 'multiple'
  checkboxValueChanged($event, i) {
    this.answers[this.currentQuestion].checked[i] = $event.checked;
    for (let j = 0; j < this.answers[this.currentQuestion].checked.length; j++) {
      if (this.answers[this.currentQuestion].checked[j] == undefined) {
        this.answers[this.currentQuestion].checked[j] = false;
      }
    }
  }

  // Creates an answer set which is populated with answers when users participate in a survey 
  createAnswerSet() {
    this.answers.length = this.survey.questions.length;
    this.survey.questions.forEach((question, qIndex) => {
      if (question.questionType == 'single') {
        let answer: SingleChoiceAnswer = {
          checked: undefined
        };
        this.answers[qIndex] = answer;
      }
      if (question.questionType == 'multiple') {
        let answer: MultipleChoiceAnswer = {
          checked: []
        };
        answer.checked.length = question.answerPossibilities.length;
        for (let i = 0; i < answer.checked.length; i++) {
          answer.checked[i] = undefined;
        }
        this.answers[qIndex] = answer;
      }
      if (question.questionType == 'text') {
        let answer: TextAnswer = {
          text: ''
        };
        this.answers[qIndex] = answer;
      }
    });
  }

  // Returns the currently active step (that is it's index) of the stepper
  getActiveStep() {
    return this.stepper.selectedIndex;
  }

  // Checks wether or not a certain step has been completed by the user
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

  // Completes the survey and submits the answers
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
      if (!res.success) {
        // Do nothing for now
      } else {
        this._router.navigate(['/survey', this.survey._id]);
      }
      
    }, (err) => {
      if (err) {
        // Do nothing for now
      }
    })
  }

  // Clean up all subscriptions
  ngOnDestroy() {
    this.paramsSub.unsubscribe();
    this.paramsSub = undefined;
    this.surveySub.unsubscribe();
    this.surveySub = undefined;
    if(this.updateSurveySub){
      this.updateSurveySub.unsubscribe();
      this.updateSurveySub = undefined;
    }
  }

}
