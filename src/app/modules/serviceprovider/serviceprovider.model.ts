

export interface BusinessAvailability {
  day: string;
  isopened: boolean;
  open_time: string;
  close_time: string;
}

export interface BusinessVerify {
  isverified: string;
  br_sideA_image: object;
  br_sideB_image: object;
  certify_name: string;
  issued_org: string;
  certify_image: object;
}


export interface Booking {
  booking_id: string;
  service_id: string; // fk
  event_id: string; // fk
  service_name: string; // retrived from service
  service_category: string;
  event_name: string; // retrived from event
  business_name: string; // retrived from service
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
  serviceProvider: {serviceProvider_id: string, email: string, name: string};
  user: { user_id: string, email: string, name: string};
}

export interface Appointment {
  appoint_id: string;
  service_id: string; // fk
  event_id: string; // fk
  service_name: string; // retrived from service
  event_name: string; // retrived from event
  business_name: string; // retrived from service
  created_date: string;
  state: string;
  appointed_date: string;
  appointed_time: {hour: number, minute: number, second: number};
  comment: string;
  serviceProvider: {serviceProvider_id: string, email: string, name: string};
  user: { user_id: string, email: string, name: string};
}

export interface Earnings {
  transaction_id: string;
  booking_id: string;
  service_booked: string;
  earned_date: string;
  earned_time: string;
  payment_type: string;
  commission_due: number;
  amount_paid: number;
  amount: number;
}

export interface IDVerify  {
  isverified: string;
  id_type: string;
  sideA_image: object;
  sideB_image: object;
}

export interface BusinessStat {
  business_id: string;
  earnings: string;
  performance_value: number;
  active_services: number;
  fb_link: string;
  insta_link: string;
  twitter_link: string;
}

export interface DashStat {
  pending_bookings: number;
  last_book_date: string;
  completed_bookings: number;
  last_completed_book_date: string;
  pending_appointments: number;
  last_appointment_date: string;
  approved_appointments: number;
  last_approved_appointment_date: string;
}

export interface PayStat {
  business_id: string;
  pay_amount: number;
  pay_due_date: string;
  overdue: boolean;
  last_payment: number;
  last_pay_date: string;
}

export interface CalendarBooking {
  title: string;
  start: string;
  end: string;
}

export interface BookingStat {
  booking_id: string;
  service_id: string;
  service_name: string;
  created_date: string;
  amount: number;
  amount_paid: number;
  state: string;
}

export interface AppointStat {
  appoint_id: string;
  service_id: string;
  service_name: string;
  created_date: string;
  state: string;
}

// reports

export interface ServiceOrderRequest {
  from_date: string;
  to_date: string;
  service_category: string;
  service_id: string;
  user_id: string;
  event_id: string;
  homeTown: string; // event location
  rating: number;
  amount: number;
  sort: string;
  group: string;
}

export interface ServiceAppointRequest {
  from_date: string;
  to_date: string;
  service_id: string;
  user_id: string;
  event_id: string;
  sort: string;
  group: string;
}


export interface PaymentHistoryRequest {
  from_date: string;
  to_date: string;
  service_id: string;
  user_id: string;
  event_id: string;
  sort: string;
  group: string;
}

export interface ServiceDetailsRequest {
  service_category: string;
  user_id: string;
  event_id: string;
  sort: string;
  group: string;
}

export interface RateReviewRequest {
  service_id: string;
  user_id: string;
  rating: number;
  sort: string;
  group: string;
}
