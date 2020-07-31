import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventNotificationComponent } from './event-notification.component';

describe('EventNotificationComponent', () => {
  let component: EventNotificationComponent;
  let fixture: ComponentFixture<EventNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventNotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
