import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isSeller = false;
  isServiceProvider = false;
  isCommon = true;
  isPlanner = false;
  isAdmin = false;

  onLogin = false;
  onRegister = false;

  constructor( private router: Router) { }

  ngOnInit() {
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
                  e.url === '/sel/dash/purchases' ||
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


}
