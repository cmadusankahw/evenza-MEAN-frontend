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
  participants: Participant[]; // state - approved/ pending/ cancelled
  total_budget: number;
  event_segments: EventSegment[];
  service_categories: Category[]; // selected service categories
  product_categories: Category[]; // selected product categories
  feature_img: string;
  qr_code: string;
  state: string; //  'pending', 'completed', 'missed/ cancelled'
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
  state: boolean; // invitation approved or cancelled
}

export interface Alert { // custom notification / invitation
  id: string;
  heading: string;
  message: string;
  date: string;
  state: string;
  attachments: any;
}

export interface EventCategory {
  id: string;
  category: string;
  img: string;
  services: Category[]; // service categories
  products: Category[]; // product categories
}

// internal interfaces

export interface EventSegment { // depend on event
  segment_id: string; // ref to event.event_id
  segment_type: string; // service  task
  segment_title: string;
  allocated_budget: number;
  sceduled_from_date: string;
  scheduled_to_date: string;
  spent_budget: number;
  state: string; // completed, pending , cancelled
  object: any; // service , task
}

// objects for event segments
export interface Service {
  service_id: string;
  service_name: string;
  service_category: string;
  booking_id: string;
  appoint_id: string;
  state: string;
}

export interface Product {
  product_id: string;
  product: string;
  product_category: string;
  order_id: string;
  state: string;
}

export interface Task {
  task_id: string;
  title: string;
  description: string;
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
