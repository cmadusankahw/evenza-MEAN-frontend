import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  ismerchant = false;
  iscommon = true;
  isuser = false;
  isadmin = false;

  onlogin = false;
  onregister = false;

  constructor( private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe( (e) => {
      if (e instanceof NavigationStart) {
        if (e.url === '/m/dash') {
            this.ismerchant = true;
            this.iscommon = false;
            this.isuser = false;
            this.isadmin = false;
            this.onlogin = false;
            this.onregister = false;

        } else if (e.url === '/') {
          this.ismerchant = false;
          this.iscommon = true;
          this.isuser = false;
          this.isadmin = false;
          this.onlogin = false;
          this.onregister = false;
        }

        if (e.url === '/login') {
          this.onlogin = true;
          this.onregister = false;

      } else if (e.url === '/register') {
        this.onregister = true;
        this.onlogin = false;

      }
      }
    });
  }


}
