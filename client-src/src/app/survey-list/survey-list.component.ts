import { Component, OnInit, OnDestroy } from '@angular/core';
import { Http } from '@angular/http';
import { Subscription } from 'rxjs';
import { Survey } from '../models/survey.model';

@Component({
  selector: 'app-survey-list',
  templateUrl: './survey-list.component.html',
  styleUrls: ['./survey-list.component.scss']
})
export class SurveyListComponent implements OnInit, OnDestroy {

  // Progress bar
  barColor: 'accent';
  barMode: 'determinate';

  loading: Boolean;
  surveysSub: Subscription;
  surveys: Survey[] = [];

  // displayedColumns = ['_id', 'name', 'startDate', 'endDate'];
  displayedColumns = ['_id', 'creator', 'name', 'startDate', 'endDate', 'navDetails'];

  constructor(private _http: Http) { }

  ngOnInit() {
    this.loading = true;
    this.surveysSub = this._http.get('http://localhost:3000/api/surveys').subscribe((res) => {
      this.surveys = res.json().surveys;
      // this.surveys = res;

      console.log('Surveys:', this.surveys);
      // console.log('Got surveys:', res.json().surveys);
      this.loading = false;
    }, (err) => {
      console.log('Error:', err);
    });
  }

  ngOnDestroy() {
    this.surveysSub.unsubscribe();
    this.surveysSub = undefined;
  }

}
