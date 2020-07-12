import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventplannerDashBookingsComponent } from './eventplanner-dash-bookings.component';

describe('EventplannerDashBookingsComponent', () => {
  let component: EventplannerDashBookingsComponent;
  let fixture: ComponentFixture<EventplannerDashBookingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventplannerDashBookingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventplannerDashBookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
