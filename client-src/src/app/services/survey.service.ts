import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  constructor(private _http: HttpClient) { }

  getSurveys() {
    const url = environment.endpoints.surveys.get;
    return this._http.get(url);
  }

  getSurvey(id: String) {
    const url = environment.endpoints.surveys.getOne + id;
    return this._http.get(url);
  }

  updateSurvey(_id: String, body: Object) {
    const url = environment.endpoints.surveys.put + _id;
    let headers: HttpHeaders;
    headers.append('Content-Type', 'application/json');
    return this._http.put(url, body, { headers: headers });
  }

  deleteSurvey(_id: String) {
    const url = environment.endpoints.surveys.delete + _id;
    let headers: HttpHeaders;
    headers.append('Content-Type', 'application/json');
    return this._http.delete(url, { headers: headers });
  }

}
