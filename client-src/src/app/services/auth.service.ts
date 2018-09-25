// Provides functionality to register and authenticate a (new) user and additional helpers

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

  // Registers a user
  registerUser(user: User) {
    const url = environment.endpoints.users.post;
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this._http.post(url, user, { headers: headers });
  }

  // Authenticates a user
  authenticateUser(user: User) {
    const url = environment.endpoints.authentication.post;
    let headers = new HttpHeaders;
    headers.append('Content-Type', 'application/json');
    return this._http.post(url, user, { headers: headers });
  }

  // Gets the profile data of a user
  getProfile(id?: string) {
    this.loadToken();
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.authToken });
    const url = environment.endpoints.users.getOne + id;
    return this._http.get(url, { headers: headers });
  }

  // Updates the profile picture of a user
  updateProfilePicture(imageBase64: string) {
    const userId = this.getUser()._id;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.authToken });
    const url = environment.endpoints.users.put + userId;
    return this._http.put(url, {imageBase64: imageBase64}, {reportProgress: true, observe: 'events'});
  }

  // Stores the user data in local storage
  storeUserData(token: string, user: User) {
    let bearer = token.replace('JWT', 'bearer');
    localStorage.setItem('id_token', bearer);
    // Can only store strings in local storage, thus we need to stringify the user first
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = bearer;
    this.user = user;
  }

  // Loads the jwt token from local storage
  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  // Checks wether or not a user is logged in (that's the case when the token is not exipired)
  isLoggedIn() {
    return !this._jwtHelper.isTokenExpired();
  }

  // Gets the user data
  getUser() {
    let user = JSON.parse(localStorage.getItem('user'));
    return user;
  }

  // Checks wether or not the currently logged in user is admin
  isAdmin() {
    let user = JSON.parse(localStorage.getItem('user'));
    if (user && user.role && user.role === 'admin') {
      return true;
    } else {
      return false;
    }
  }

  // Logs a user off
  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
