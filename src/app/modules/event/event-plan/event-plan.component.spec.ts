import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventPlanComponent } from './event-plan.component';

describe('EventPlanComponent', () => {
  let component: EventPlanComponent;
  let fixture: ComponentFixture<EventPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
