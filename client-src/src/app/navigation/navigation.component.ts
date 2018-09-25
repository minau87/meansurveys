import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

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
  }

  // Logs out a currently logged in user
  logout() {
    this._authService.logout();
    this._router.navigate(['/welcome']);
    return false;
  }

}
