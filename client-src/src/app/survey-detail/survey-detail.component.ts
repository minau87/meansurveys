import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Survey, SurveyResponse } from '../models/survey.model';
import { SurveyService } from '../services/survey.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-survey-detail',
  templateUrl: './survey-detail.component.html',
  styleUrls: ['./survey-detail.component.scss']
})
export class SurveyDetailComponent implements OnInit, OnDestroy {

  // Progress bar
  barColor: 'accent';
  barMode: 'determinate';

  // Define columns to display in the survey list table
  displayedColumns = ['numQuestions', 'numParticipants', 'startDate', 'endDate'];

  loading: Boolean = true;
  survey$: Observable<Survey>;
  paramsSub: Subscription;
  surveySub: Subscription;
  survey: Survey;

  constructor(private _surveyService: SurveyService, private _router: Router, private _route: ActivatedRoute) { }

  ngOnInit() {
    this.paramsSub = this._route.params.subscribe((params) => {
      this.surveySub = this._surveyService.getSurvey(params.id).subscribe((res: SurveyResponse) => {
        console.log('Survey:', res.survey);
        this.survey = res.survey;
        this.loading = false;
      });
    });
  }

  surveyToArray() {
    let dataSource = [];
    dataSource.push(this.survey);
    return dataSource;
  }

  ngOnDestroy() {
    // Clean up subscription
    this.paramsSub.unsubscribe();
    this.paramsSub = undefined;
    this.surveySub.unsubscribe();
    this.surveySub = undefined;
  }

}
