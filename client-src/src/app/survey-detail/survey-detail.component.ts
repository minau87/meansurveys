// Provides a detailed view for a specific survey with, if existing, results for that survey

import { Component, OnInit, OnDestroy, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Survey, SurveyResponse, AnswerSet, Answer } from '../models/survey.model';
import { SurveyService } from '../services/survey.service';
import { switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-survey-detail',
  templateUrl: './survey-detail.component.html',
  styleUrls: ['./survey-detail.component.scss']
})
export class SurveyDetailComponent implements OnInit, OnChanges, OnDestroy {

  // Progress bar
  barColor: 'accent';
  barMode: 'determinate';

  // Define columns to display in the survey list table
  displayedColumns = ['numQuestions', 'numParticipants', 'startDate', 'endDate'];

  @ViewChild('chart') chart: BaseChartDirective;
  chartConfig = {
    chartLoading: true,
    pieChartLabels: ['A', 'B', 'C'],
    pieChartData: [0, 2, 5],
    pieChartType: 'pie',
    displayLegend: true,
    currentQuestion: 0
  };
  viewAsChart = true;

  resultTableColumns: string[] = ['A', 'B', 'C'];
  resultTableData = [];

  loading: Boolean = true;
  survey$: Observable<Survey>;
  paramsSub: Subscription;
  surveySub: Subscription;
  survey: Survey;

  constructor(
    private _surveyService: SurveyService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _authService: AuthService
  ) { }

  ngOnInit() {
    this.paramsSub = this._route.params.subscribe((params) => {
      this.surveySub = this._surveyService.getSurvey(params.id).subscribe((res: SurveyResponse) => {
        this.survey = res.survey;
        this.setChartData();
        this.loading = false;
      });
    });
  }

  ngOnChanges(changes:SimpleChanges){
    // Might have to track changes in case input properties change. Check later.
  }

  // Transforms a survey to an array that can be user within the Material Table component
  surveyToArray() {
    let dataSource = [];
    dataSource.push(this.survey);
    return dataSource;
  }

  // Checks wether or not a user is allowed to participate in a survey
  canParticipate() {
    return (this.survey.participants.indexOf(this._authService.getUser()._id) !== -1) ? false : true;
  }

  // Navigates to the participation component
  participate() {
    this._router.navigate(['/participate', this.survey._id]);
  }

  // Navigates to the overview of all surveys
  navigateToOverview() {
    this._router.navigate(['/surveys']);
  }

  // Sets the data to be displayed for each question and chart
  setChartData() {
    this.chartConfig.chartLoading = true;
    let chartData = [];

    // Set length of the chartData-Array to the same length as the answer possibilities for any given question
    chartData.length = this.survey.questions[this.chartConfig.currentQuestion].answerPossibilities.length;

    let chartLabels = [];

    for (let answerPossibilityIndex = 0; answerPossibilityIndex < this.survey.questions[this.chartConfig.currentQuestion].answerPossibilities.length; answerPossibilityIndex++) {
      chartLabels.push(this.survey.questions[this.chartConfig.currentQuestion].answerPossibilities[answerPossibilityIndex].answerPossibility);
    }
    if(this.chart && this.viewAsChart){
      this.chart.chart.config.data.labels = chartLabels;
    }
    this.chartConfig.pieChartLabels = chartLabels;

    // If questionType == 'single', initialize the chartData-Array with the following values
    if (this.survey.questions[this.chartConfig.currentQuestion].questionType == 'single') {
      for (let i = 0; i < chartData.length; i++) {
        chartData[i] = 0;
      }
      for (let answerSetIndex = 0; answerSetIndex < this.survey.answers.length; answerSetIndex++) {
        let answerSet = this.survey.answers[answerSetIndex];
        let answer = answerSet.answers[this.chartConfig.currentQuestion].checked;
        for (let i = 0; i < chartData.length; i++) {
          if (answer == chartLabels[i]) {
            chartData[i]++;
          }
        }
      }
      if(this.chart && this.viewAsChart){
        this.chart.chart.config.data.labels
      }
      this.chartConfig.pieChartData = chartData;
    }

    // If questionType == 'multiple', initialize the chartData-Array with the following values
    if (this.survey.questions[this.chartConfig.currentQuestion].questionType == 'multiple') {
      for (let i = 0; i < chartData.length; i++) {
        chartData[i] = 0;
      }

      for (let answerSetIndex = 0; answerSetIndex < this.survey.answers.length; answerSetIndex++) {
        let answerSet = this.survey.answers[answerSetIndex];
        let answer = answerSet.answers[this.chartConfig.currentQuestion].checked;
        for (let answerIndex = 0; answerIndex < answer.length; answerIndex++) {
          if (answer[answerIndex]) {
            chartData[answerIndex]++;
          }
        }
      }
      this.chartConfig.pieChartData = chartData;
      this.chartConfig.chartLoading = false;
    }
    // If questionType == 'text', initialize the chartData-Array with the following values
    if (this.survey.questions[this.chartConfig.currentQuestion].questionType == 'text') {
      for (let i = 0; i < this.survey.answers.length; i++) {
        let answerSet = this.survey.answers[i].answers;
        let answer = answerSet[this.chartConfig.currentQuestion].text;
        if (chartLabels.indexOf(answer, 0) == -1) {
          chartLabels.push(answer);
        }
      }
      chartLabels.splice(0, 1);
      let chartData = [];
      chartData.length = chartLabels.length;
      for (let i = 0; i < chartData.length; i++) {
        chartData[i] = 0;
      }
      for (let i = 0; i < this.survey.answers.length; i++) {
        let answerSet = this.survey.answers[i].answers;
        let answer = answerSet[this.chartConfig.currentQuestion].text;
        for (let j = 0; j < this.chartConfig.pieChartLabels.length; j++) {
          if (answer == this.chartConfig.pieChartLabels[j]) {
            chartData[j]++;
          }
        }
      }

      this.chartConfig.pieChartData = chartData;
      if(this.chart && this.viewAsChart){
        this.chart.chart.config.data.labels = chartLabels;
      }
    }

    this.resultTableColumns = this.chartConfig.pieChartLabels;
    let tableData = Object.assign({}, this.chartConfig.pieChartData);
    this.resultTableData = [];
    this.resultTableData.push(tableData);
    // Object.assign({}, ['a','b','c']);
    this.chartConfig.chartLoading = false;
  }

  // Switches the result view from chart to table or table to chart
  switchResultView(){
    this.viewAsChart = this.viewAsChart ? false : true;
  }

  // Switches to the next question within the survey
  nextQuestion() {
    if (this.survey.questions[this.chartConfig.currentQuestion + 1]) {
      this.chartConfig.currentQuestion++;
    } else {
      this.chartConfig.currentQuestion = 0;
    }
    this.setChartData();
  }

  // Switches to the previous question within the survey
  previousQuestion() {
    if (this.survey.questions[this.chartConfig.currentQuestion - 1]) {
      this.chartConfig.currentQuestion--;
    } else {
      this.chartConfig.currentQuestion = this.survey.questions.length - 1;
    }
    this.setChartData();
  }

  // Properly clean up all active subscriptions
  ngOnDestroy() {
    if(this.paramsSub){
      this.paramsSub.unsubscribe();
      this.paramsSub = undefined;
    }
    if(this.surveySub){
      this.surveySub.unsubscribe();
      this.surveySub = undefined;
    }
  }

}
