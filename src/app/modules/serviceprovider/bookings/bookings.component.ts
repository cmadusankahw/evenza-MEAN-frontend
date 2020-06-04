import { Component, OnInit, ViewChild, Input, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Booking } from '../serviceprovider.model';
import { Subscription } from 'rxjs';
import { ServiceProviderService } from '../serviceprovider.service';
import { Email } from '../../eventplanner/eventplanner.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss']
})
export class BookingsComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['id', 'service_name', 'booked_date', 'duration', 'amount_paid', 'action'];
  dataSource: MatTableDataSource<Booking>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  // subscritions
  private bookingSub: Subscription;


  // Create sample bookings
  bookings: Booking[];

  // classified bookingd
  recievedBookings: Booking[] = [];

  // selected booking
  selectedBooking: Booking;

  // booking-states
  @Input() bookingType = 'pending';

   // cancel message
   cancelMsg: string;


  constructor(private serviceProviderService: ServiceProviderService,
              private router: Router) {

  }

  ngOnInit() {
    this.serviceProviderService.getBookings();
    this.bookingSub = this.serviceProviderService.getBookingsUpdateListener()
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


 // classify recieved bookings
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

   // cancel a booking
   cancelBooking() {
    const cancelledMessage = document.getElementById('content').innerHTML;
    console.log(cancelledMessage);
    const mail: Email = {
      email: this.selectedBooking.user.email,
      subject: 'Your Booking: (ID:' + this.selectedBooking.booking_id + ') on ' + this.selectedBooking.service_name + ' is Cancelled',
      html:  '<u><b>Notice:</b></u> ' + cancelledMessage + '<p>' +
      this.cancelMsg +
      '</p> <br> <p> Paid amount will be refunded within 2-3 business days.</p><br> <p> For more details, Please <a href="evenza.biz//login">Log In</a></p>'
    };
    this.serviceProviderService.sendEmail(mail);
    document.getElementById('discardBtn').click();
  }

  // change booking state to completed
  changeBookingState(bookingId: string, state: string) {
    const bookingState = {
      bookingId,
      state
    };
    this.serviceProviderService.changeBookingState(bookingState);
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/sp/dash/bookings']);
  }

}
