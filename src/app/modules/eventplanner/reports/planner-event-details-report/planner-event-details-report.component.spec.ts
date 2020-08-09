import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlannerEventDetailsReportComponent } from './planner-event-details-report.component';

describe('PlannerEventDetailsReportComponent', () => {
  let component: PlannerEventDetailsReportComponent;
  let fixture: ComponentFixture<PlannerEventDetailsReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlannerEventDetailsReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlannerEventDetailsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
