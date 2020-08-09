import { CardDetails } from '../auth/auth.model';
import html2canvas from 'html2canvas';

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
  payment_details: MerchantPayments[];
}

export interface MerchantPayments {
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  user_type: string;
  pays: PaymentData[];
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
    timestamp: {year: string, month: string };
    paid_date: string;
    paid_amount: number;
    due_amount: number;
}

export interface DashboardData {
  bookings: [BookingData];
  orders: [OrderData];
  users: [UsersData];
}

// interfaces nd function expoers regarding stratergic report generation

export interface MonthHolder {
  year: number;
  jan: number;
  feb: number;
  mar: number;
  apr: number;
  may: number;
  jun: number;
  july: number;
  aug: number;
  sep: number;
  oct: number;
  nov: number;
  dec: number;
}


export function getLastSixMonths(date: Date): string[] {
  const newArr = [];
  const returnArr = [];
  let newDate = date.getMonth() + 1;
  for(var i=0 ; i<6 ; i++){
    newArr.push(newDate);
    newDate--;
  }
  for(var d of newArr){
    returnArr.push(findMonth(d));
  }
  console.log(returnArr);
  return returnArr;
}

export function findMonth(no: number): string{
  var month: string;
  switch (no){
    case 1: month = 'January'; break;
    case 2: month = 'February'; break;
    case 3: month = 'March'; break;
    case 4: month = 'April'; break;
    case 5: month = 'May'; break;
    case 6: month = 'June'; break;
    case 7: month = 'July'; break;
    case 8: month = 'Aug'; break;
    case 9: month = 'Sept'; break;
    case 10: month = 'Oct'; break;
    case 11: month = 'Nov';  break;
    case 12: month = 'Dec'; break;
  }
  return month;
}


export function updateCount(date: string, appMonths: MonthHolder) {
  const month = date.slice(5, 7) ;
  if ( month === '01') {
    this.appMonths.jan++;
  } else if ( month === '02') {
    this.appMonths.feb++;
  } else if ( month === '03') {
    this.appMonths.mar++;
  } else if ( month === '04') {
    this.appMonths.apr++;
  } else if ( month === '05') {
    this.appMonths.may++;
  } else if ( month === '06') {
    this.appMonths.jun++;
  } else if ( month === '07') {
    this.appMonths.jul++;
  } else if ( month === '08') {
    this.appMonths.aug++;
  } else if ( month === '09') {
    this.appMonths.sep++;
  } else if ( month === '10') {
    this.appMonths.oct++;
  } else if ( month === '11') {
    this.appMonths.nov++;
  } else if ( month === '12') {
    this.appMonths.dec++;
  }
  return appMonths;
}

// exporting the report canvas
export function printCanvas(content: string, title: string) {
  const element = document.getElementById('content');
  html2canvas(element).then((canvas) => {
      // Convert the canvas to blob
      canvas.toBlob((blob) => {
          // To download directly on browser default 'downloads' location
          const link = document.createElement('a');
          link.download = title + '.png';
          link.href = URL.createObjectURL(blob);
          link.click();
      }, 'image/png');
  });
}
