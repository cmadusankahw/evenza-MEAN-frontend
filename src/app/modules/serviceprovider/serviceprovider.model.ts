

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



export interface Earnings {
  transaction_id: string;
  booking_id: string;
  service_booked: string;
  duration: number;
  booking_type: string;
  cust_name: string;
  earned_date: string;
  earned_time: string;
  comments: string;
  payment_type: string;
  commission_due: number;
  net_earning: number;
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
  business_id: string;
  merchant_id: string;
  pending_bookings: number;
  last_book_date: string;
  confirmed_bookings: number;
  last_confirmed_book_date: string;
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

export interface Merchant {
  user_id: string;
  user_type: string;
  first_name: string;
  last_name: string;
  profile_pic: string;
  nic: string;
  email: string;
  contact_no: string;
  address_line1: string;
  address_line2: string;
  postal_code: string;
  gender: string;
  date_of_birth: string;
  isverified: boolean;
  reg_date: string;
  // business details
  // business_created_date: string;
  // business_title: string;
  // description: string;
  // business_email: string;
  // business_contact_no: string;
  // business_address_line1: string;
  // business_address_line2: string;
  // business_postal_code: string;
  // business_location: string;
  // business_isverified: boolean;
  // br_side_a: string;
  // br_side_b: string;
  // open_days: [{ day: number, from_time: string, to_time: string; }];
  // payment_verified: boolean;
  // card_no: number;
  // pin_no: number;
  // bank: string;
  // exp_date: string;
  // feature_img: string;
  // logo: string;
}

// to be removed once merchant is configured
export interface Business {
  id: string;
  merchant_type: string;
  title: string;
  description: string;
  email: string;
  contact_no: string;
  address_line1: string;
  address_line2: string;
  postal_code: string;
  location: string;
  isverified: boolean;
  isopened: boolean;
  payment_verified: boolean;
  feature_img: string;
  logo: string;
}
