import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../admin.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-dash-payments',
  templateUrl: './admin-dash-payments.component.html',
  styleUrls: ['./admin-dash-payments.component.scss']
})
export class AdminDashPaymentsComponent implements OnInit {

  // subscription
  public feeSub: Subscription;

  // recieved subscription fee
  public fee: number = 0;

  constructor(private adminService: AdminService) { }

  ngOnInit() {
     // get admin for child comp use
     this.adminService.getSubscription();
     this.feeSub = this.adminService.getSubscriptionUpdatedListener().subscribe(
       fee => {
         if (fee) {
           this.fee = fee;
           console.log(this.fee);
         }
       });
  }

  // change subscription fee
  setSubscription(fee: number) {
    this.adminService.setSubscription(fee);
  }

}
