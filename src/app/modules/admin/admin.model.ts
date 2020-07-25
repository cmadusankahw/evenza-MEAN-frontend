import { CardDetails } from '../auth/auth.model';

export interface Admin {
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
  card_details: CardDetails;
  payment_details: {
      user_id: string;
      user_type: string;
      pays: {
        timestamp: {year: string, month: string };
        paid_date: string;
        paid_amount: number;
        due_amount: number;
      }[];
  }[];
}


export interface BookingData {
  pending: number;
  completed: number;
  cancelled: number;
}

export interface OrderData {
  pending: number;
  delivered: number;
  cancelled: number;
}

export interface UsersData {
  sellers: number;
  serviceProviders: number;
}

export interface OrderMonth {
  year: number;
  month: number;
  delivered_sales: number;
  cancelled_sales: number;
}

export interface BookingMonth {
  year: number;
  month: number;
  confirmed_bookings: number;
  cancelled_bookings: number;
}

export interface PaymentData {
  year: number;
  month: number;
  paid_amount: number;
  due_amount: number;
}

export interface DashboardData {
  bookings: [BookingData];
  orders: [OrderData];
  users: [UsersData];
}
