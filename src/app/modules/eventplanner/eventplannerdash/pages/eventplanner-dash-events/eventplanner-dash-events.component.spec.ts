import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventplannerDashEventsComponent } from './eventplanner-dash-events.component';

describe('EventplannerDashEventsComponent', () => {
  let component: EventplannerDashEventsComponent;
  let fixture: ComponentFixture<EventplannerDashEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventplannerDashEventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventplannerDashEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
