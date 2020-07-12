import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventplannerDashParticipantsComponent } from './eventplanner-dash-participants.component';

describe('EventplannerDashParticipantsComponent', () => {
  let component: EventplannerDashParticipantsComponent;
  let fixture: ComponentFixture<EventplannerDashParticipantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventplannerDashParticipantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventplannerDashParticipantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
