export interface Event {
  event_id: string;
  event_title: string;
  description: string;
  event_type: string; // open or closed event
  event_category: string; // event planned category
  from_date: string;
  from_time: string;
  to_date: string;
  to_time: string;
  one_day_event: boolean;
  created_date: string;
  location: string; // if 'online' --> online event
  no_of_participants: number;
  total_budget: number;
  host_name: string; // if hosted by not creator
  host_email: string;
  feature_img: string;
  state: string; // 'planned', 'ongoing', 'completed'
}

export interface Participant {
  participant_id: string; // refe to event.event_id
  first_name: string;
  last_name: string;
  email: string;
  state: boolean; // invitation approved or cancelled
  review: string;
}

export interface Alert {
  id: string;
  heading: string;
  message: string;
  date: string;
  state: string;
}


export interface EventSegment { // depend on event
  segment_id: string; // ref to event.event_id
  segment_type: string; // scheduled, service, product, info
  segment_category: string; // product/service category if product/service, null otherwise
  segment_title: string;
  description: string;
  scheduled_date: string;
  scheduled_time: string;
  created_date: string;
  allocated_budget: string;
  state: string; // booked, ordered, completed, missed
  mark_as_completed: boolean;
  ref_link: string; // reference link to complete/ details of the segment
  ref_id: string; // reference to order id / booking id if service/ product
}
