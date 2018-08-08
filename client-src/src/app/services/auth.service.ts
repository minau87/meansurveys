import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '../models/user.model';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authToken: any;
  user: User;

  constructor(private _http: HttpClient, private _jwtHelper: JwtHelperService) { }

  registerUser(user: User) {
    const url = environment.endpoints.users.post;
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this._http.post(url, user, { headers: headers });
  }

  authenticateUser(user: User) {
    const url = environment.endpoints.authentication.post;
    let headers = new HttpHeaders;
    headers.append('Content-Type', 'application/json');
    return this._http.post(url, user, { headers: headers });
  }

  getProfile(id?: string) {
    this.loadToken();
    // console.log(this.authToken);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.authToken });
    // const url = environment.endpoints.profile.get;
    const url = environment.endpoints.users.getOne + id;
    return this._http.get(url, { headers: headers });
  }

  updateProfilePicture(imageBase64: string) {
    const userId = this.getUser()._id;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.authToken });
    const url = environment.endpoints.users.put + userId;
    return this._http.put(url, {imageBase64: imageBase64}, {reportProgress: true, observe: 'events'});
  }

  storeUserData(token: string, user: User) {
    let bearer = token.replace('JWT', 'bearer');
    localStorage.setItem('id_token', bearer);
    // Can only store strings in local storage, thus we need to stringify the user first
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = bearer;
    this.user = user;
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  isLoggedIn() {
    return !this._jwtHelper.isTokenExpired();
  }

  getUser() {
    let user = JSON.parse(localStorage.getItem('user'));
    return user;
  }

  isAdmin() {
    let user = JSON.parse(localStorage.getItem('user'));
    if (user && user.role && user.role === 'admin') {
      return true;
    } else {
      return false;
    }
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
