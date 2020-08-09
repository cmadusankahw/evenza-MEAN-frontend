import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpServiceOrdersReportComponent } from './sp-service-orders-report.component';

describe('SpServiceOrdersReportComponent', () => {
  let component: SpServiceOrdersReportComponent;
  let fixture: ComponentFixture<SpServiceOrdersReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpServiceOrdersReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpServiceOrdersReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
