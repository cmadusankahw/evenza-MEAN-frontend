import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUsersPieChartComponent } from './admin-users-pie-chart.component';

describe('AdminUsersPieChartComponent', () => {
  let component: AdminUsersPieChartComponent;
  let fixture: ComponentFixture<AdminUsersPieChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminUsersPieChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUsersPieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
