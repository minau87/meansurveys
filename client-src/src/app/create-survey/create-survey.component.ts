import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-survey',
  templateUrl: './create-survey.component.html',
  styleUrls: ['./create-survey.component.scss']
})
export class CreateSurveyComponent implements OnInit {

  constructor() { }

  isLimitedSurvey = false;
  sliderConfig = {
    min: 1,
    max: 30,
    stepSize: 1,
    thumbLabel: true,
    color: 'primary'
  };
  daysSurveyLasts = 1;

  toggleConfig = {
    color: 'primary',
    checked: false,
    disabled: false
  };

  ngOnInit() {
  }

  onLimitedSurveyValueChange() {
    console.log(this.isLimitedSurvey);
  }

}
