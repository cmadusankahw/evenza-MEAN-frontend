import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPaymentsChartComponent } from './admin-payments-chart.component';

describe('AdminPaymentsChartComponent', () => {
  let component: AdminPaymentsChartComponent;
  let fixture: ComponentFixture<AdminPaymentsChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPaymentsChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPaymentsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
