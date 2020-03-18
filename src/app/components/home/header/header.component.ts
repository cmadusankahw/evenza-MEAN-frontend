import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  ismerchant = true;
  iscommon = false;
  isuser = false;
  isadmin = false;

  constructor() { }

  ngOnInit() {
  }

}
