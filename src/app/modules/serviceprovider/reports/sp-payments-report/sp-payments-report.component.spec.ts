import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpPaymentsReportComponent } from './sp-payments-report.component';

describe('SpPaymentsReportComponent', () => {
  let component: SpPaymentsReportComponent;
  let fixture: ComponentFixture<SpPaymentsReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpPaymentsReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpPaymentsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
