import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventPlanSegmentComponent } from './event-plan-segment.component';

describe('EventPlanSegmentComponent', () => {
  let component: EventPlanSegmentComponent;
  let fixture: ComponentFixture<EventPlanSegmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventPlanSegmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventPlanSegmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
