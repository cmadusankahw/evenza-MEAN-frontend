import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlannerBookingsComponent } from './planner-bookings.component';

describe('PlannerBookingsComponent', () => {
  let component: PlannerBookingsComponent;
  let fixture: ComponentFixture<PlannerBookingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlannerBookingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlannerBookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
