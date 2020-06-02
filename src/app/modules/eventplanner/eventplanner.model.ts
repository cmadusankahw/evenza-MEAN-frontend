import { DeliveryService } from '../product/product.model';

export interface EventPlanner {
  user_id: string;
  first_name: string;
  last_name: string;
  profile_pic: string;
  email: string;
  contact_no: string;
  address_line1: string;
  address_line2: string;
  postal_code: string;
  gender: string;
  date_of_birth: string;
  reg_date: string;
}

export interface Order {
  order_id: string;
  product_id: string; // fk
  product: string; // retrived from product
  qty_type: string; // retrived from produc
  business_name: string; // retrived from product
  customer_name: string; // retrived from Event Planner
  delivery_address: string;
  created_date: string;
  state: string;
  review: string;
  quantity: number;
  comment: string;
  amount: number;
  commission_due: number;
  amount_paid: number;
  seller_id: string;
  delivery_service: DeliveryService; // retrived from product.delivery_service
}


export interface ProductCategories {
  id: string;
  val: string;
}

export interface ServiceCategories {
  id: string;
  val: string;
}

export interface Booking {
  booking_id: string;
  service_id: string; // fk
  event_id: string; // fk
  service_name: string; // retrived from service
  event_name: string; // retrived from event
  business_name: string; // retrived from service
  customer_name: string; // retrived from Event Planner
  rate_type: string; // retrived from service
  created_date: string;
  state: string;
  review: string;
  from_date: string;
  to_date: string;
  duration: number;
  from_time: {hour: number, minute: number, second: number};
  to_time: {hour: number, minute: number, second: number};
  comment: string;
  amount: number;
  commission_due: number;
  amount_paid: number;
  serviceProvider_id: string;
}

export interface Appointment {
  appoint_id: string;
  service_id: string; // fk
  event_id: string; // fk
  service_name: string; // retrived from service
  event_name: string; // retrived from event
  business_name: string; // retrived from service
  customer_name: string; // retrived from Event Planner
  created_date: string;
  state: string;
  appointed_date: string;
  appointed_time: {hour: number, minute: number, second: number};
  comment: string;
  serviceProvider_id: string;
}

export interface Alert {
  id: string;
  heading: string;
  message: string;
  date: string;
  state: string;
}

export interface Email {
  email: string;
  subject: string;
  html: string;
}
