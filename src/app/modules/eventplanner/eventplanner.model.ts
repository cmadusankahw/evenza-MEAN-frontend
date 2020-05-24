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
  user_id: string; // fk (created user)
  product: string; // retrived from product
  delivery_service: string; // retrived from product
  qty_type: string; // retrived from product
  delivery_address: string;
  created_date: string;
  created_time: string;
  state: string;
  review: string;
  quantity: number;
  comment: string;
  payment_type: string;
  amount: number;
  commission_due: number;
  amount_paid: number;
}

export interface DeliveryService {
  delivery_service: string;
  title: string;
  address: string;
  hotline: string;
  delivery_rate: number;
  min_delivery_time: number;
  max_delivery_time: number;
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
  user_id: string; // fk (created user)
  event_id: string; // fk
  service_name: string; // retrived from service
  event_name: string; // retrived from event
  created_date: string;
  created_time: string;
  state: string;
  review: string;
  from_date: string;
  to_date: string;
  duration: number;
  from_time: string;
  to_time: string;
  comment: string;
  payment_type: string;
  amount: number;
  commission_due: number;
  amount_paid: number;
}

export interface Appointment {
  appoint_id: string;
  service_id: string; // fk
  user_id: string; // fk (created user)
  event_id: string; // fk
  service_name: string; // retrived from service
  event_name: string; // retrived from event
  created_date: string;
  created_time: string;
  state: string;
  appointed_date: string;
  appointed_time: string;
  comment: string;
}

export interface Alert {
  id: string;
  heading: string;
  message: string;
  date: string;
  state: string;
}
