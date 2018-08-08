import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User, RegisterUserResponse } from '../models/user.model';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  userDataForm: FormGroup;
  registerSub: Subscription;

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _snackbar: MatSnackBar,
    private _router: Router
  ) {
    this.userDataForm = this._fb.group({
      name: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      email: ['', Validators.compose([Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)])],
      username: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(15)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(5)])]
    });
  }

  ngOnInit() {
  }

  // Register the user
  submitRegistration() {
    const user: User = {
      name: this.userDataForm.value.name,
      email: this.userDataForm.value.email,
      username: this.userDataForm.value.username,
      password: this.userDataForm.value.password
    };
    console.log(user);
    this.registerSub = this._authService.registerUser(user).subscribe((res: RegisterUserResponse) => {
      console.log('Response:', res);
      if (res.success) {
        // Redirect
        this._router.navigate(['/login']);
      } else {
        // Show error message
        this._snackbar.open('Could not register a new user. Please try again.', '', { duration: 5000 });
      }
    }, (err) => {
      this._snackbar.open('An error occured: ' + err + '. Please try again.', '', { duration: 5000 });
    });
  }

  navigateToLogin() {
    this._router.navigate(['/login']);
  }

  // Clean up subscriptions
  ngOnDestroy() {
    if (this.registerSub) {
      this.registerSub.unsubscribe();
      this.registerSub = undefined;
    }
  }

}
