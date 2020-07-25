import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrdersPieChartComponent } from './admin-orders-pie-chart.component';

describe('AdminOrdersPieChartComponent', () => {
  let component: AdminOrdersPieChartComponent;
  let fixture: ComponentFixture<AdminOrdersPieChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminOrdersPieChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOrdersPieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
