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
          console.log(err);
          this._snackbar.open('An error occured: Status: ' + err.status + ' Message: ' + err.error.msg + '. Try again.', 'Dismiss');
        }, 0);
        this._router.navigate(['/login']);
        return false;
      });
    });
  }

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

  onFileNotAllowed($event) {
    console.log($event);
    this._snackbar.open('Sorry, but you can only choose a .png or .jpg-File.', 'Got it!');
  }

  onFileUpload($event) {
    // console.log('Image:', $event);
    this.uploadPictureSub = this._authService.updateProfilePicture($event).subscribe((event) => {
      console.log('event:', event);
      if (event.type === HttpEventType.UploadProgress) {
        console.log('Upload Progress: ' + Math.round(event.loaded / event.total * 100) + '%');
        this.uploadProgress = Math.round(event.loaded / event.total * 100);
      } else if (event.type === HttpEventType.Response) {
        this.paramsSub = this._route.params.subscribe((params) => {
          let id = params.id;
          this.getProfileSub = this._authService.getProfile(id).subscribe((profile: ProfileResponse) => {
            this.setUser(profile);
          }, (err) => {
            setTimeout(() => {
              console.log(err);
              this._snackbar.open('An error occured: Status: ' + err.status + ' Message: ' + err.error.msg + '. Try again.', 'Dismiss');
            }, 0);
            return false;
          });
        });
        this._snackbar.open('Picture updated!', '', { duration: 3000 });
      }
    }, (err) => {
      console.log(err);
    });
  }

  onFileTooBig($event) {
    this._snackbar.open(
      `Sorry, this file is too big (${$event} MB). Choose a file that's not bigger than ${this.maxFileSize} MB.`, 'Got it!'
    );
  }

  getImage(binaryImage) {
    console.log(btoa(binaryImage.data));
    return 'data:image/png;base64,' + btoa(binaryImage.data);
  }

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
