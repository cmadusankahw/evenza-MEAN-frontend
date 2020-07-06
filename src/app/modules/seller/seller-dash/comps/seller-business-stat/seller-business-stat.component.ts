import { Component, OnInit, Input, OnChanges } from '@angular/core';


@Component({
  selector: 'app-seller-business-stat',
  templateUrl: './seller-business-stat.component.html',
  styleUrls: ['./seller-business-stat.component.scss']
})
export class SellerBusinessStatComponent implements OnInit {

  iscreated = true;

  amounts = {
    totalCommisionDue: 0,
    totalEarning: 0,
    no_of_bookings: 0
  };

  performanceValue = 0;

  constructor() { }

  ngOnInit() {
  }


// calculate business performance value
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
