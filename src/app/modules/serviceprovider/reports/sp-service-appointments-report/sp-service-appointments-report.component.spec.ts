import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpServiceAppointmentsReportComponent } from './sp-service-appointments-report.component';

describe('SpServiceAppointmentsReportComponent', () => {
  let component: SpServiceAppointmentsReportComponent;
  let fixture: ComponentFixture<SpServiceAppointmentsReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpServiceAppointmentsReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpServiceAppointmentsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
