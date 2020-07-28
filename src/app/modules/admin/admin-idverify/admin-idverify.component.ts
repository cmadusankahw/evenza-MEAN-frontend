
import { Component, OnInit, ViewChild, Input, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Subscription } from 'rxjs';
import { IdVerifications } from '../../auth/auth.model';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-admin-idverify',
  templateUrl: './admin-idverify.component.html',
  styleUrls: ['./admin-idverify.component.scss']
})
export class AdminIdverifyComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['user_id', 'issuer', 'action'];
  dataSource: MatTableDataSource<IdVerifications>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  // subscritions

  private verifySub: Subscription;

  idVerifications: IdVerifications[] = [];

  selectedVerification: IdVerifications;

  constructor( private authService: AuthService) { }

  ngOnInit() {
       // get admin for child comp use
   this.authService.getIDVerifications();
   this.verifySub = this.authService.getIDVerificationsUpdateListener().subscribe(
     res => {
       if (res) {
         this.idVerifications = res;
         console.log(this.idVerifications);
         this.dataSource = new MatTableDataSource(this.idVerifications);
         this.dataSource.paginator = this.paginator;
         this.dataSource.sort = this.sort;
      }
     });
  }


  ngOnDestroy() {

    if (this.verifySub) {
      this.verifySub.unsubscribe();
    }
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // get selected
  showUsertDetails(id: string) {
    for (const app of this.idVerifications) {
      if (app.user_id === id) {
        this.selectedVerification = app;
      }
    }
  }

  verifyID(id: IdVerifications){
    this.authService.approveIDVerification(id);
  }

}
