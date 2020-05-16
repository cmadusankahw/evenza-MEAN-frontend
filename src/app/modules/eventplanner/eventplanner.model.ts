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
  product_id: string;
  cust_id: string;
  product: string;
  product_category: string;
  customer_name: string;
  created_date: string;
  created_time: string;
  state: string;
  rating: number;
  review: string;
  quantity: number;
  qty_type: string;
  delivery_service: string;
  comment: string;
  payment_type: string;
  amount: number;
  commission_due: number;
  amount_paid: number;
}

export interface ProductCategories {
  id: string;
  val: string;
}

export interface ServiceCategories {
  id: string;
  val: string;
}

export interface DeliveryService {
  delivery_id: string;
  delivery_name: string;
  address: string;
  hotline: number;
  delivery_rate: number;
  rate_type: string;
  min_delivery_time: number;
  max_delivery_time: number;
}


export interface Booking {
  booking_id: string; // ref  user.user_id
  service_id: string;
  event_id: string;
  service_name: string; // retrived from service
  customer_name: string; // retrived from user
  created_date: string;
  created_time: string;
  state: string;
  rating: number;
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
  appoint_id: string; // ref user.user_id
  service_id: string;
  service_name: string;
  customer_name: string;
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
