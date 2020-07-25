import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashPaymentsComponent } from './admin-dash-payments.component';

describe('AdminDashPaymentsComponent', () => {
  let component: AdminDashPaymentsComponent;
  let fixture: ComponentFixture<AdminDashPaymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminDashPaymentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDashPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
