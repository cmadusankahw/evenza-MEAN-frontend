import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, Event, NavigationStart } from '@angular/router';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isSeller = false;
  isServiceProvider = false;
  isCommon = true;
  isPlanner = false;
  isAdmin = false;

  onLogin = false;
  onRegister = false;

  constructor( private router: Router, private authService: AuthService) { }

  private authSubs: Subscription;

  userIsAuthenticated = false;

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getisAuth();
    this.authSubs = this.authService.getAuhStatusListener().subscribe(
      isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      }
    );

    // to be deleted
    this.router.events.subscribe( (e) => {
      if (e instanceof NavigationStart) {
        if (e.url === '/sp/dash' ||
            e.url === '/sp/dash/bprofile' ||
            e.url === '/sp/dash/bookings' ||
            e.url === '/sp/dash/appoints' ||
            e.url === '/sp/dash/calendar' ||
            e.url === '/sp/dash/reports' ||
            e.url === '/sp/dash/profile'
        ) {
            this.isServiceProvider = true;
            this.isSeller = false;
            this.isCommon = false;
            this.isPlanner = false;
            this.isAdmin = false;
            this.onLogin = false;
            this.onRegister = false;

        } else if (e.url === '/sel/dash' ||
                  e.url === '/sel/dash/bprofile' ||
                  e.url === '/sel/dash/orders' ||
                  e.url === '/sel/dash/inventory' ||
                  e.url === '/sel/dash/reports' ||
                  e.url === '/sel/dash/profile'
        ) {
          this.isSeller = true;
          this.isServiceProvider = false;
          this.isCommon = false;
          this.isPlanner = false;
          this.isAdmin = false;
          this.onLogin = false;
          this.onRegister = false;

        } else if (e.url === '/') {
          this.isSeller = false;
          this.isServiceProvider = false;
          this.isCommon = true;
          this.isPlanner = false;
          this.isAdmin = false;
          this.onLogin = false;
          this.onRegister = false;
        }

        if (e.url === '/login') {
          this.onLogin = true;
          this.onRegister = false;

      } else if (e.url === '/register') {
        this.onRegister = true;
        this.onLogin = false;

      }
      }
    });
  }

  ngOnDestroy() {
    this.authSubs.unsubscribe();
  }

  onSignOut(){
    this.authService.signOut();
  }


}
