import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventplannerDashAppointmentsComponent } from './eventplanner-dash-appointments.component';

describe('EventplannerDashAppointmentsComponent', () => {
  let component: EventplannerDashAppointmentsComponent;
  let fixture: ComponentFixture<EventplannerDashAppointmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventplannerDashAppointmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventplannerDashAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
