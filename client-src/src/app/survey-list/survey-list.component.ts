// Displays a list of all available surveys

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Survey, SurveyResponse } from '../models/survey.model';
import { SurveyService } from '../services/survey.service';

@Component({
  selector: 'app-survey-list',
  templateUrl: './survey-list.component.html',
  styleUrls: ['./survey-list.component.scss']
})
export class SurveyListComponent implements OnInit, OnDestroy {

  // Progress bar
  barColor: 'accent';
  barMode: 'determinate';

  loading: Boolean = true;
  surveysSub: Subscription;
  surveys: Survey[] = [];

  // Define columns to display in the survey list table
  displayedColumns = ['_id', 'creator', 'name', 'startDate', 'endDate', 'navDetails'];

  constructor(private _surveyService: SurveyService) { }

  ngOnInit() {
    this.surveysSub = this._surveyService.getSurveys().subscribe((res: SurveyResponse) => {
      this.surveys = res.surveys;
      window.setTimeout(() => {
        this.loading = false;
      }, 10000);
      this.loading = false;
    }, (err) => {
      // Do nothing for now
    });
  }

  ngOnDestroy() {
    // Clean up all the subscriptions
    this.surveysSub.unsubscribe();
    this.surveysSub = undefined;
  }

}
