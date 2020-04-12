import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-seller-dashboard',
  templateUrl: './seller-dashboard.component.html',
  styleUrls: ['./seller-dashboard.component.scss']
})
export class SellerDashboardComponent implements OnInit {

  showSubMenu = false;
  home = true;
  bProfile = false;
  purchaseHistory = false;
  inventory = false;
  report = false;
  profile = false;

    //create new product
    editmode = true;
    addnew = true;

    isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver) { }

  ngOnInit() {
  }


  onHome() {
    this.home = true;
    this.bProfile = false;
    this.purchaseHistory = false;
    this.inventory = false;
    this.report = false;
    this.profile = false;

  }


  onBprofile() {
    this.home = false;
    this.bProfile = true;
    this.purchaseHistory = false;
    this.inventory = false;
    this.report = false;
    this.profile = false;

  }


  onPurchaseHistory() {
    this.home = false;
    this.bProfile = false;
    this.purchaseHistory = true;
    this.inventory = false;
    this.report = false;
    this.profile = false;

  }


  onInventory() {
    this.home = false;
    this.bProfile = false;
    this.purchaseHistory = false;
    this.inventory = true;
    this.report = false;
    this.profile = false;

  }


  onReport() {
    this.home = false;
    this.bProfile = false;
    this.purchaseHistory = false;
    this.inventory = false;
    this.report = true;
    this.profile = false;

  }


  onProfile() {
    this.home = false;
    this.bProfile = false;
    this.purchaseHistory = false;
    this.inventory = false;
    this.report = false;
    this.profile = true;

  }

}
