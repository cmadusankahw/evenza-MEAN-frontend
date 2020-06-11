export interface Service {
  service_id: string;
  service_name: string;
  business_name: string;
  description: string;
  service_category: string;
  available_booking: boolean;
  available_appoints: boolean;
  rating: number;
  no_of_ratings: number;
  no_of_bookings: number;
  no_of_appoints: number;
  created_date: string;
  created_time: string;
  rate: number;
  rate_type: string;
  capacity: number;
  pay_on_meet: boolean;
  image_01: string;
  image_02: string;
  image_03: string;
}

export interface ServiceCategories {
  id: string;
  val: string;
}

export interface ServiceRates {
  id: string;
  val: string;
}

export interface ServiceQuery {
  category: string;
  minPrice: number;
  maxPrice: number;
  payOnMeet: boolean;
  userRating: number;
}


export interface Booking {
  booking_id: string;
  service_id: string; // fk
  event_id: string; // fk
  service_name: string; // retrived from service
  service_category: string;
  event_name: string; // retrived from event
  business_name: string;
  rate_type: string;
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
  // serviceProvider
  // user
}

export interface Appointment {
  appoint_id: string;
  service_id: string; // fk
  event_id: string; // fk
  service_name: string; // retrived from service
  event_name: string; // retrived from event
  business_name: string;
  created_date: string;
  state: string;
  appointed_date: string;
  appointed_time: {hour: number, minute: number, second: number};
  comment: string;
  // serviceProvider
  // user
}
