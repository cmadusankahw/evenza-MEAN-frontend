import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlannerAppointsComponent } from './planner-appoints.component';

describe('PlannerAppointsComponent', () => {
  let component: PlannerAppointsComponent;
  let fixture: ComponentFixture<PlannerAppointsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlannerAppointsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlannerAppointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
