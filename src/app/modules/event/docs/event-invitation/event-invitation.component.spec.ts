import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventInvitationComponent } from './event-invitation.component';

describe('EventInvitationComponent', () => {
  let component: EventInvitationComponent;
  let fixture: ComponentFixture<EventInvitationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventInvitationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventInvitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
