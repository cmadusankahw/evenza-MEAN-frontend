import { Component, OnInit, ViewChild, Input, OnDestroy, EventEmitter, Output } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { Order } from '../seller.model';
import { SellerService } from '../seller.service';
import { Email } from '../../eventplanner/eventplanner.model';
import { ProductCategories } from '../../product/product.model';
import { ProductService } from '../../product/product.service';

@Component({
  selector: 'app-seller-orders',
  templateUrl: './seller-orders.component.html',
  styleUrls: ['./seller-orders.component.scss']
})
export class SellerOrdersComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['id', 'product', 'date_ordered', 'quantity', 'amount_paid', 'action'];
  dataSource: MatTableDataSource<Order>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  // subscription
  private orderSub: Subscription;
  private catSub: Subscription;

  // order types
  @Input() orderType = 'pending';
  // Create sample bookings
  orders: Order[];
  // recieved orders
  recievedOrders: Order[] = [];
  // selected order
  selectedOrder: Order;
  // categories
  categories: ProductCategories[] = [];
  // cancel message
  cancelMsg: string;

  constructor(private sellerService: SellerService,
              private productService: ProductService,
              private router: Router) { }

  ngOnInit() {
    this.sellerService.getOrders();
    this.orderSub = this.sellerService.getOrdersUpdateListener()
      .subscribe((recievedOrders: Order[]) => {
        this.orders = recievedOrders;
        console.log(this.orders);
        if (this.orders) {
          this.dataSource = new MatTableDataSource(this.addOrders(this.orders, this.orderType));
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      });
    this.productService.getCategories();
    this.catSub = this.productService.getCategoriesUpdateListener()
      .subscribe((res: ProductCategories[]) => {
        this.categories = res;
        console.log(this.categories);
      });
  }

  ngOnDestroy() {
    if (this.orderSub) {
      this.orderSub.unsubscribe();
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

  // classify orders in to different categories
  addOrders(orders: Order[], state: string) {
    const pendingOrders = [];
    for (const val of orders) {
      if (val.state === state) {
        pendingOrders.push(Object.assign({}, val));
      }
    }
    this.recievedOrders = [...pendingOrders];
    return this.recievedOrders;
  }


  // get selected booking details
  showOrderDetails(orderId: string) {
    for (const app of this.orders) {
      if (app.order_id === orderId) {
        this.selectedOrder = app;
      }
    }
  }

  // change booking state to completed
  changeOrderState(orderId: string, state: string) {
    const orderState = {
      orderId,
      state
    };
    this.sellerService.changeOrderState(orderState);
    if (state === 'cancelled') {
      this.sendCancelMail();
    }
    if (state === 'delivered') {
      this.sendDeliveredMail();
    }
    setTimeout(() => {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['/sel/dash/orders']);
    }, 1000);
  }

  // deliver an order mail
  sendDeliveredMail() {
    const mail: Email = {
      email: this.selectedOrder.user.email,
      subject: 'Your Order: (ID:' + this.selectedOrder.order_id + ') on ' + this.selectedOrder.product + ' is on Delivery Now',
      html: '<h3>Your Order: (ID:' + this.selectedOrder.order_id + ') on ' + this.selectedOrder.product + ' is on Delivery</h3><br>'
        + '<h5><b> You will recieve your product within 2- 3 Days to the provided address.</b></h5>' +
        '<p>Delivery Service Details: </p>  <table> <thead> <tr> <th> Delivery Address :' +
        this.selectedOrder.delivery_address
        + '</th></tr> </thead><tbody><tr> <td> Delivery Service: ' + this.selectedOrder.delivery_service.title
        + '</td></tr> <tr> <td> Contact No: ' + this.selectedOrder.delivery_service.hotline
        + '</td></tr> <tr> <td> Email: ' + this.selectedOrder.delivery_service.email
        + '</td></tr></tbody></table><br>'
        + ' <p> For more details, Please <a href="evenza.biz//login">Log In</a></p>'
    };
    this.sellerService.sendEmail(mail);
    document.getElementById('discardBtn').click();
  }


  // cancel an order mail
  sendCancelMail() {
    const cancelledMessage = document.getElementById('content').innerHTML;
    console.log(cancelledMessage);
    const mail: Email = {
      email: this.selectedOrder.user.email,
      subject: 'Your Order: (ID:' + this.selectedOrder.order_id + ') on ' + this.selectedOrder.product + ' is Cancelled',
      html: '<u><b>Notice:</b></u> ' + cancelledMessage + '<p>' +
        this.cancelMsg +
        '</p> <br> <p> Paid amount will be refunded within 2-3 business days.</p><br> <p> For more details, Please <a href="evenza.biz//login">Log In</a></p>'
    };
    this.sellerService.sendEmail(mail);
    document.getElementById('discardBtn').click();
  }


}
