import { Component, OnInit, ViewChild, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Booking } from '../serviceprovider.model';
import { Subscription } from 'rxjs';
import { ServiceProviderService } from '../serviceprovider.service';
import { Email } from '../../eventplanner/eventplanner.model';
import { Router } from '@angular/router';
import { ServiceService } from '../../service/service.service';
import { ServiceCategories } from '../../service/service.model';



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
  private catSub: Subscription;

  @Output() countEmit = new EventEmitter<any>();

  @Output() datesEmit = new EventEmitter<any>();

  bookingCounts = { pendingBookings: 0, completedBooking: 0, pendingBookingDate: '', completedBookingDate: '' };
  bookingMonths = { jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0, oct: 0, nov: 0, dec: 0 };


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

  // service categories
  categories: ServiceCategories[] = [];


  constructor(private serviceProviderService: ServiceProviderService,
              private serviceService: ServiceService,
              private router: Router) {

  }

  ngOnInit() {
    this.serviceProviderService.updateBookings();
    this.bookingSub = this.serviceProviderService.getBookingsUpdateListener()
      .subscribe((recievedBookings: Booking[]) => {
        this.bookings = recievedBookings;
        console.log(this.bookings);
        if (this.bookings) {
          this.dataSource = new MatTableDataSource(this.addBookings(this.bookings, this.bookingType));
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.updateCount(this.bookings);
        }
      });
    this.serviceService.getCategories();
    this.catSub = this.serviceService.getCategoriesUpdateListener()
      .subscribe((res: ServiceCategories[]) => {
        this.categories = res;
        console.log(this.categories);
      });
  }

  ngOnDestroy() {
    if (this.bookingSub) {
      this.bookingSub.unsubscribe();
    }
    if (this.catSub) {
      this.catSub.unsubscribe();
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
  sendCancelMail() {
    const cancelledMessage = document.getElementById('content').innerHTML;
    console.log(cancelledMessage);
    const mail: Email = {
      email: this.selectedBooking.user.email,
      subject: 'Your Booking: (ID:' + this.selectedBooking.booking_id + ') on ' + this.selectedBooking.service_name + ' is Cancelled',
      html: '<u><b>Notice:</b></u> ' + cancelledMessage + '<p>' +
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
    if (state === 'cancelled') {
      this.sendCancelMail();
    }
    setTimeout(() => {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['/sp/dash/bookings']);
    }, 1000);
  }

  async updateCount(bookiings: Booking[]) {
    for (const book of bookiings) {
      const month = book.to_date.slice(5, 7);
      if (book.state === 'pending') {
        this.bookingCounts.pendingBookings++;
        this.bookingCounts.pendingBookingDate = book.created_date.slice(0, 10);
      }
      if (book.state === 'completed') {
        this.bookingCounts.completedBooking++;
        this.bookingCounts.completedBookingDate = book.created_date.slice(0, 10);
      }
      if (month === '01') {
        this.bookingMonths.jan++;
      } else if (month === '02') {
        this.bookingMonths.feb++;
      } else if (month === '03') {
        this.bookingMonths.mar++;
      } else if (month === '04') {
        this.bookingMonths.apr++;
      } else if (month === '05') {
        this.bookingMonths.may++;
      } else if (month === '06') {
        this.bookingMonths.jun++;
      } else if (month === '07') {
        this.bookingMonths.jul++;
      } else if (month === '08') {
        this.bookingMonths.aug++;
      } else if (month === '09') {
        this.bookingMonths.sep++;
      } else if (month === '10') {
        this.bookingMonths.oct++;
      } else if (month === '11') {
        this.bookingMonths.nov++;
      } else if (month === '12') {
        this.bookingMonths.dec++;
      }
    }
    console.log(this.bookingCounts);
    console.log(this.bookingMonths);
    setTimeout(() => {
      this.setCountEmit();
      this.setDatesEmit();
    }, 1500);

  }

  setCountEmit() {
    this.countEmit.emit(this.bookingCounts);
  }

  setDatesEmit() {
    this.datesEmit.emit(this.bookingMonths);
  }

}
