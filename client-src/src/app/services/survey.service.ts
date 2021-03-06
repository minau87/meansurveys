// Provides functionality to create surveys and additional helpers

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Survey, SurveyResponse } from '../models/survey.model';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  constructor(private _http: HttpClient) { }

  // Gets all the surveys and returns an observable
  getSurveys() {
    const url = environment.endpoints.surveys.get;
    return this._http.get(url);
  }

  // Gets a specific survey identified by id and returns an observable
  getSurvey(id: String) {
    const url = environment.endpoints.surveys.getOne + id;
    return this._http.get(url);
  }

  // Creates a new survey and returns an observable
  createSurvey(survey: Survey){
    const url = environment.endpoints.surveys.post;
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this._http.post<SurveyResponse>(url, survey, {headers: headers});
  }

  // Updates an existing survey specified by id with the data within the body-parameter
  updateSurvey(_id: String, body: Object) {
    const url = environment.endpoints.surveys.update + _id;
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this._http.post(url, body, { headers: headers });
  }

  // Deletes a survey (although this functionality is not implemented yet)
  deleteSurvey(_id: String) {
    const url = environment.endpoints.surveys.delete + _id;
    let headers: HttpHeaders;
    headers.append('Content-Type', 'application/json');
    return this._http.delete(url, { headers: headers });
  }

}
