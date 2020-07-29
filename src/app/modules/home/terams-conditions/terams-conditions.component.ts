import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-terams-conditions',
  templateUrl: './terams-conditions.component.html',
  styleUrls: ['./terams-conditions.component.scss']
})
export class TeramsConditionsComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit() {
  }

  backClicked() {
    this.location.back();
  }

}
