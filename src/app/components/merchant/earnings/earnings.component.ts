import { Component, OnInit,ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface Earnings {
  id: string;
  service_booked: string;
  earned_date_time: string;
  amount: string;
}

@Component({
  selector: 'app-earnings',
  templateUrl: './earnings.component.html',
  styleUrls: ['./earnings.component.scss']
})
export class EarningsComponent implements OnInit {

  displayedColumns: string[] = ['id', 'service_booked', 'earned_date_time', 'amount', 'action'];
  dataSource: MatTableDataSource<Earnings>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  //view info
  moreinfo = false;

  constructor() {
    // Create sample earning records
    const users = [
      { id: '1', service_booked: 'chiran', earned_date_time: '27/03 01.35 PM', amount: '25.0' },
      { id: '2', service_booked: 'kamal', earned_date_time: '27/03 01.35 PM', amount: '25.0' },
      { id: '3', service_booked: 'namal', earned_date_time: '27/03 01.35 PM', amount: '25.0' },
      { id: '4', service_booked: 'bingo', earned_date_time: '27/03 01.35 PM', amount: '25.0' },
      { id: '5', service_booked: 'bingo', earned_date_time: '27/03 01.35 PM', amount: '25.0' },
      { id: '6', service_booked: 'bingo', earned_date_time: '27/03 01.35 PM', amount: '25.0' },
      { id: '7', service_booked: 'bingo', earned_date_time: '27/03 01.35 PM', amount: '25.0' }
    ];

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);
   }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}
