import { Component, OnInit, ViewChild, Input, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Booking, Email } from '../eventplanner.model';
import { EventPlannerService } from '../eventplanner.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-planner-bookings',
  templateUrl: './planner-bookings.component.html',
  styleUrls: ['./planner-bookings.component.scss']
})
export class PlannerBookingsComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['id', 'service_name', 'booked_date', 'duration', 'amount_paid', 'action'];
  dataSource: MatTableDataSource<Booking>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  // subscritions
  private bookingSub: Subscription;

  // Create sample bookings
  bookings: Booking[];

  // booking-states
  @Input() bookingType = 'pending';

  // booking arrays
  recievedBookings: Booking[] = [];

  // selected booking
  selectedBooking: Booking;

  // cancel message
  cancelMsg: string;


  // rate and review
  rateReview = false;

  // add review mode
  addReview = false;

  constructor(private eventPlannerService: EventPlannerService) { }

  ngOnInit() {
    this.eventPlannerService.getBookings();
    this.bookingSub = this.eventPlannerService.getBookingsUpdateListener()
      .subscribe((recievedBookings: Booking[]) => {
        this.bookings = recievedBookings;
        console.log(this.bookings);
        if (this.bookings) {
          this.dataSource = new MatTableDataSource(this.addBookings(this.bookings, this.bookingType));
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      });
  }

  ngOnDestroy() {
    if (this.bookingSub) {
      this.bookingSub.unsubscribe();
    }
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // classify reieved bookings
  addBookings(bookings: Booking[], state: string) {
    const pendingBookings = [];
    for (const val of bookings) {
      if (val.state === state) {
        pendingBookings.push(Object.assign({}, val));
      }
    }
    this.recievedBookings = [...pendingBookings];
    return this.recievedBookings;
  }

  // get selected booking details
  showBookingDetails(bookingId: string) {
    for (const app of this.bookings) {
      if (app.booking_id === bookingId) {
        this.selectedBooking = app;
      }
    }
  }

  // submit a review for booking
  submitReview(bookingId: string, review: string) {
    this.eventPlannerService.submitReview(bookingId, review, 'booking');
  }

  // send a cancel request
  sendCancelRequest() {
    const cancelledMessage = document.getElementById('content').innerHTML;
    console.log(cancelledMessage);
    const mail: Email = {
      email: this.selectedBooking.serviceProvider.email,
      subject: 'Cancel Request for Booking: (ID:' + this.selectedBooking.booking_id + ')',
      html: cancelledMessage + '<p>' + this.cancelMsg + '</p> <br> <p> For more details, Please <a href="evenza.biz//login">Log In</a></p>'
    };
    this.eventPlannerService.sendEmail(mail);
    document.getElementById('discardBtn').click();
  }


}
