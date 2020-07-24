import { BusinessLocation } from '../auth/auth.model';

export interface TheEvent {
  event_id: string;
  event_title: string;
  description: string;
  event_type: string; // open or closed event
  event_category: string; // event planned category
  from_date: string;
  to_date: string;
  created_date: string;
  location: BusinessLocation; // if 'online' --> online event
  no_of_participants: number; // data taken at event creation
  participants: {
      participants: Participant[];
      approved_participants: number};
  alerts: Alert[]; // invitation and other alert messages // first alet should be the invitation
  total_budget: number;
  event_segments: {
    tasks: Task[],
    services: Service[],
    products: Product[]
  };
  service_categories: Category[]; // selected service categories
  product_categories: Category[]; // selected product categories
  feature_img: string;
  qr_code: string;
  state: string; //  unpublished / published/ cancelled
  social_links: SocialLinks;
  host: Host;
}


export interface EventCard {
  event_id: string;
  event_title: string;
  description: string;
  event_category: string; // event planned category
  from_date: string;
  to_date: string;
  location: string; // if 'online' --> online event
  no_of_participants: number; // data taken at event creation
  feature_img: string;
  state: string; // 'planned', 'ongoing', 'completed'
}

export interface Participant {
  participant_id: string; // refe to event.event_id
  first_name: string;
  last_name: string;
  email: string;
  state: boolean; // invitated/ pending/ accepted
}

export interface Alert { // custom notification / invitation
  id: string;
  type: string; // notification/ invitation
  heading: string;
  message: string;
  created_date: string;
  state: string; // sent or draft
  attachments: string[]; // attached images (qr code etc..)
}

export interface EventCategory {
  id: string;
  category: string;
  img: string;
  services: Category[]; // service categories
  products: Category[]; // product categories
}

// internal interfaces



// objects for event segments
export interface Service {
  service_id: string;
  service_name: string;
  service_category: string;
  booking_id: string;
  appoint_id: string;
  allocated_budget: number;
  spent_budget: number;
  booking_from_date: string;
  booking_to_date: string;
  appointed_date: string;
  state: string;
}

export interface Product {
  product_id: string;
  product: string;
  product_category: string;
  order_id: string;
  allocated_budget: number;
  spent_budget: number;
  ordered_date: string;
  state: string;
}

export interface Task {
  task_id: string;
  title: string;
  description: string;
  scheduled_from_date: string;
  scheduled_to_date: string;
  state: string;
}

export interface SocialLinks {
  fb: string;
  instagram: string;
  other: string;
}

export interface Category {
  id: string;
  category: string;
  precentage: number; // INTIAL SUGGESTED AMOUNT OR PRECENTAGE (MAY NEED TO CHANGE)
}


export interface Host {
  user_id: string;
  email: string;
  name: string;
}

export interface CalendarTask {
  title: string;
  start: Date;
  end: Date;
  backgroundColor: string;
}

export function refactorDate(date: Date, time: {hour: number, minute: number}): string {
  let ISODate = date.toISOString();
  let timeString = '';
  if (time.hour < 10) {
    timeString += ('0' + time.hour.toString() + ':') ;
  } else {
    timeString += (time.hour.toString() + ':') ;
  }
  if (time.minute < 10) {
    timeString += ('0' + time.minute.toString() + ':') ;
  } else {
    timeString += (time.minute.toString() + ':') ;
  }
  ISODate = ISODate.slice(0, 11) + timeString + '00.255Z';
  console.log(ISODate);

  return ISODate;

}
