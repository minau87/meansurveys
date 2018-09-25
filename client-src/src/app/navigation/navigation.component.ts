import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
// import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  isNotLoggedIn: Boolean = false;

  constructor(private _authService: AuthService, private _router: Router) { }

  ngOnInit() {
    this.isNotLoggedIn = this._authService.isLoggedIn();
    // console.log('this.isLoggedIn:', this.isNotLoggedIn);
  }

  logout() {
    this._authService.logout();
    this._router.navigate(['/welcome']);
    return false;
  }

}
