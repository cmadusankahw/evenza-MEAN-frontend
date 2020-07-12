import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';



@Component({
  selector: 'app-business-stat',
  templateUrl: './business-stat.component.html',
  styleUrls: ['./business-stat.component.scss']
})
export class BusinessStatComponent implements OnInit  {

 iscreated = true;

 amounts = {
   totalCommisionDue: 0,
   totalEarning: 0,
   no_of_bookings: 0
 };

 performanceValue = 2.8;

  constructor() { }

  ngOnInit() {
  }


  businessValue(val) {
    if (val > 85) {
      return '5.0 Superior';
    } else if (val > 75) {
      return '4.5 Best';
    } else if (val > 65) {
      return '4.0 Performer';
    } else if (val > 45) {
      return '3.5 Good';
    } else if (val > 25) {
      return '2.0 Avarage';
    } else if (val > 0) {
      return '1.0 Poor';
    }
  }

  // recieve earning values
  setAmounts(event){
    this.amounts = event;
  }

}
