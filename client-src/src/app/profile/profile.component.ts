// Serves as a overview over some of the currently logged in users data

import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { User, ProfileResponse } from '../models/user.model';
import { MatSnackBar } from '@angular/material';
import { HttpClient, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  paramsSub: Subscription;
  getProfileSub: Subscription;
  uploadPictureSub: Subscription;
  user: User;
  fileUploadForm: FormGroup;
  uploadProgress: Number;
  maxFileSize = 0.300;

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _snackbar: MatSnackBar,
    private _fb: FormBuilder
  ) {
    this.fileUploadForm = this._fb.group({
      file: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.paramsSub = this._route.params.subscribe((params) => {
      let id = params.id;
      this.getProfileSub = this._authService.getProfile(id).subscribe((profile: ProfileResponse) => {
        this.setUser(profile);
      }, (err) => {
        setTimeout(() => {
          this._snackbar.open('An error occured: Status: ' + err.status + ' Message: ' + err.error.msg + '. Try again.', 'Dismiss');
        }, 0);
        this._router.navigate(['/login']);
        return false;
      });
    });
  }

  // Sets the currently active user
  setUser(profile: ProfileResponse) {
    this.user = {
      username: profile.user.username,
      _id: profile.user._id,
      email: profile.user.email,
      name: profile.user.name,
      password: profile.user.password,
      profilePicture: profile.user.profilePicture
    };
  }

  // Shows a popup at the bottom when a choosen file type is not allowed
  onFileNotAllowed($event) {
    this._snackbar.open('Sorry, but you can only choose a .png or .jpg-File.', 'Got it!');
  }

  // Submits the choose profile picture
  onFileUpload($event) {
    this.uploadPictureSub = this._authService.updateProfilePicture($event).subscribe((event) => {
      if (event.type === HttpEventType.UploadProgress) {
        this.uploadProgress = Math.round(event.loaded / event.total * 100);
      } else if (event.type === HttpEventType.Response) {
        this.paramsSub = this._route.params.subscribe((params) => {
          let id = params.id;
          this.getProfileSub = this._authService.getProfile(id).subscribe((profile: ProfileResponse) => {
            this.setUser(profile);
          }, (err) => {
            setTimeout(() => {
              this._snackbar.open('An error occured: Status: ' + err.status + ' Message: ' + err.error.msg + '. Try again.', 'Dismiss');
            }, 0);
            return false;
          });
        });
        this._snackbar.open('Picture updated!', '', { duration: 3000 });
      }
    }, (err) => {
      // Do nothing for now
    });
  }

  // Shows a popup at the bottom of the screen when the choosen file is too big
  onFileTooBig($event) {
    this._snackbar.open(
      `Sorry, this file is too big (${$event} MB). Choose a file that's not bigger than ${this.maxFileSize} MB.`, 'Got it!'
    );
  }

  // Gets the image data
  getImage(binaryImage) {
    return 'data:image/png;base64,' + btoa(binaryImage.data);
  }

  // Properly clean up all active subscriptions
  ngOnDestroy() {
    if (this.getProfileSub) {
      this.getProfileSub.unsubscribe();
      this.getProfileSub = undefined;
    }
    if (this.uploadPictureSub) {
      this.uploadPictureSub.unsubscribe();
      this.uploadPictureSub = undefined;
    }
  }

}
