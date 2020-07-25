import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashReportsComponent } from './admin-dash-reports.component';

describe('AdminDashReportsComponent', () => {
  let component: AdminDashReportsComponent;
  let fixture: ComponentFixture<AdminDashReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminDashReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDashReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
