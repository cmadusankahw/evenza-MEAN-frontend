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
        if (e.url === '/sp/dash') {
            this.isServiceProvider = true;
            this.isSeller = false;
            this.isCommon = false;
            this.isPlanner = false;
            this.isAdmin = false;
            this.onLogin = false;
            this.onRegister = false;

        } else if (e.url === '/seller/dash') {
          this.isSeller = true;
          this.isServiceProvider = false;
          this.isCommon = true;
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
