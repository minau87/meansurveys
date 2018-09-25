import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { LoginResponse } from '../models/user.model';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  loginSub: Subscription;

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _router: Router,
    private _snackbar: MatSnackBar
  ) {
    this.loginForm = this._fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  // Initializes the login process of a user
  login() {
    const credentials = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    };
    this.loginSub = this._authService.authenticateUser(credentials).subscribe((res: LoginResponse) => {
      if (res.success) {
        // Set token in local storage
        this._authService.storeUserData(<string>res.token, res.user);
        // Navigate to profile
        this._router.navigate([`/profile/${res.user._id}`]);
      } else {
        // Show error message if login was not successfull
        this._snackbar.open('Error: ' + res.msg + ' Please try again.', '', { duration: 5000 });
      }
    }, (err) => {
      // Show error if something else happens
      this._snackbar.open('An error occured. Please try again.', '', { duration: 5000 });
    });
  }

  // Navigates to the registration form
  navigateToRegister() {
    this._router.navigate(['/register']);
  }

  // Properly clean up all active subscriptions
  ngOnDestroy() {
    if (this.loginSub) {
      this.loginSub.unsubscribe();
      this.loginSub = undefined;
    }
  }

}
