import { DeliveryService } from '../product/product.model';
import html2canvas from 'html2canvas';
import * as jspdf from 'jspdf';

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
  delivery_address: string;
  created_date: string;
  state: string;
  review: string;
  quantity: number;
  comment: string;
  amount: number;
  commission_due: number;
  amount_paid: number;
  delivery_service: DeliveryService; // retrived from product.delivery_service
  seller: { seller_id: string, email: string, name: string };
  user: { user_id: string, email: string, name: string };
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
  rate_type: string; // retrived from service
  created_date: string;
  state: string;
  review: string;
  from_date: string;
  to_date: string;
  duration: number;
  from_time: { hour: number, minute: number, second: number };
  to_time: { hour: number, minute: number, second: number };
  comment: string;
  amount: number;
  commission_due: number;
  amount_paid: number;
  serviceProvider: { serviceProvider_id: string, email: string, name: string };
  user: { user_id: string, email: string, name: string };
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
  appointed_time: { hour: number, minute: number, second: number };
  comment: string;
  serviceProvider: { serviceProvider_id: string, email: string, name: string };
  user: { user_id: string, email: string, name: string };
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

export interface Inquery {
  id: string;
  heading: string;
  category: string;
  message: string;
}


// print the document
export function printData(htmlContent: string, type: string) {
  const data = document.getElementById(htmlContent);
  const divHeight = data.clientHeight;
  const divWidth = data.clientWidth;
  const ratio = divHeight / divWidth;

  html2canvas(data).then((canvas) => {
    const imgData = canvas.toDataURL('image/jpeg');
    const pdfDOC = new jspdf("p", "mm", "a4"); //  use a4 for smaller page

    const width = pdfDOC.internal.pageSize.getWidth();
    let height = pdfDOC.internal.pageSize.getHeight();
    height = ratio * width;

    pdfDOC.addImage(imgData, 'JPEG', 20, 5, width  , height );
    const today = new Date().toISOString();
    pdfDOC.save(type + '_' + today + '.pdf'); // Generated PDF
  })

  // html2canvas(data).then(canvas => {
  //   // Few necessary setting options
  //   const imgWidth = 208;
  //   const pageHeight = 295;
  //   const imgHeight = canvas.height * imgWidth / canvas.width;
  //   const heightLeft = imgHeight;

  //   const contentDataURL = canvas.toDataURL('images/print/');
  //   const pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
  //   const position = 0;
  //   pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
  //   const today = new Date().toISOString();
  //   pdf.save(type + '_' + today + '.pdf'); // Generated PDF
  // });
}
