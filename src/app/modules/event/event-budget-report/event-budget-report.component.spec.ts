import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventBudgetReportComponent } from './event-budget-report.component';

describe('EventBudgetReportComponent', () => {
  let component: EventBudgetReportComponent;
  let fixture: ComponentFixture<EventBudgetReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventBudgetReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventBudgetReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
