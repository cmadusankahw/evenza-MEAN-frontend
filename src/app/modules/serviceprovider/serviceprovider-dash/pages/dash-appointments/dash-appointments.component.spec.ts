import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashAppointmentsComponent } from './dash-appointments.component';

describe('DashAppointmentsComponent', () => {
  let component: DashAppointmentsComponent;
  let fixture: ComponentFixture<DashAppointmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashAppointmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
