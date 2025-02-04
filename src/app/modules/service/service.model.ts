export interface Service {
  service_id: string;
  service_name: string;
  business_name: string;
  description: string;
  service_category: string;
  available_booking: boolean;
  available_appoints: boolean;
  rating: number;
  reviews: Review[];
  promotions: Promotion[];
  no_of_ratings: number;
  no_of_bookings: number;
  no_of_appoints: number;
  created_date: string;
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
  fromDate: string;
  toDate: string;
}

export interface EventServiceQuery {
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
  duration: number; // no of hours or no of days
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
  service_category: string;
  business_name: string;
  created_date: string;
  state: string;
  appointed_date: string;
  comment: string;
  // serviceProvider
  // user
}

export interface Review {
  user: string;
  rating: number;
  review: string;
}

export interface Promotion {
  from_date: string;
  to_date: string;
  title: string;
  precentage: number;
}
