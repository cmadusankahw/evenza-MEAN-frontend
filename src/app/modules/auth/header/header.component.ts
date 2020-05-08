import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

import { Merchant, EventPlanner } from '../auth.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {


  onLogin = false;
  onRegister = false;

  constructor(private router: Router, private authService: AuthService) { }

  private authSubs: Subscription;
  private userTypeSubs: Subscription;

  // check if user is authneticated
  userIsAuthenticated = false;

  // get signed user type
  signedUserType: string;



  ngOnInit() {
    this.userIsAuthenticated = this.authService.getisAuth();
    this.authSubs = this.authService.getAuhStatusListener().subscribe(
      isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        console.log(isAuthenticated);
      }
    );
    this.signedUserType = this.authService.getSignedUserType();
    this.userTypeSubs = this.authService.getUserTypeListener().subscribe(
      userType => {
        this.signedUserType = userType;
        console.log(userType);
      }
    );
    // hide login and signup button depend on route
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationStart) {

        if (e.url === '/login') {
          this.onLogin = true;
          this.onRegister = false;

        } else if (e.url === '/register') {
          this.onRegister = true;
          this.onLogin = false;
        } else {
          this.onLogin = false;
          this.onRegister = false;
        }
      }
      if (!(e instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });

  }

  ngOnDestroy() {
    if (this.authSubs) {
      this.authSubs.unsubscribe();
    }
    if (this.userTypeSubs) {
      this.userTypeSubs.unsubscribe();
    }

  }

  onSignOut() {
    this.authService.signOut();
  }


}
