import { Component, OnInit, Input } from '@angular/core';

export interface BusinessStat {
  business_id: string;
  earnings: string;
  performance_value: number;
  onselling_products: number;
  fb_link: string;
  insta_link: string;
  twitter_link: string;
}

@Component({
  selector: 'app-seller-business-stat',
  templateUrl: './seller-business-stat.component.html',
  styleUrls: ['./seller-business-stat.component.scss']
})
export class SellerBusinessStatComponent implements OnInit {

  @Input() iscreated;

  businessStat: BusinessStat[] = [
    {
      business_id: 'B-01', earnings: '0.0', performance_value: 65, onselling_products: 3,
      fb_link: 'fb/com/sampleBusiness', insta_link: 'instagram.com/sampleBusinss', twitter_link: 'twitter.com/sampleBusiness'
    },
  ];


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

}
