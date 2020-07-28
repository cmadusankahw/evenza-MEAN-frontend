
import { Component, OnInit, ViewChild, Input, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Subscription } from 'rxjs';
import { Merchant } from '../../auth/auth.model';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['user_id', 'user_type', 'name', 'email', 'business' , 'action'];
  dataSource: MatTableDataSource<Merchant>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  // subscritions
  private merchantSub: Subscription;

  // final merchants list
  merchants: Merchant[] = [];

  // recieved state
  @Input() userType = 'serviceProvider';

  // payment arrays
  recievedMerchants: Merchant[] = [];

  // selected payment
  selectedMerchant: Merchant;


  constructor( private authService: AuthService) { }

  ngOnInit() {
     // get admin for child comp use
   this.authService.getMerchants();
   this.merchantSub = this.authService.getMerchansUpdateListener().subscribe(
     merchants => {
       if (merchants) {
         this.recievedMerchants = merchants;
         console.log(this.recievedMerchants);
         this.dataSource = new MatTableDataSource(this.addMerchants(this.recievedMerchants, this.userType));
         this.dataSource.paginator = this.paginator;
         this.dataSource.sort = this.sort;
      }
     });
  }

  ngOnDestroy() {

    if (this.merchantSub) {
      this.merchantSub.unsubscribe();
    }
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  // classify reieved merchant payments
  addMerchants(merchants: Merchant[], userType: string): Merchant[] {
    const pendingBookings = [];
    for (const val of merchants) {
      if (val.user_type === userType) {
        pendingBookings.push(Object.assign({}, val));
      }
    }
    this.merchants = [...pendingBookings];
    return this.merchants;
  }

  // get selected payment details
  showUsertDetails(userId: string) {
    for (const app of this.merchants) {
      if (app.user_id === userId) {
        this.selectedMerchant = app;
      }
    }
  }

  removeMerchant(merchantId: string) {
    this.authService.removeMerchant(merchantId);
  }


}
