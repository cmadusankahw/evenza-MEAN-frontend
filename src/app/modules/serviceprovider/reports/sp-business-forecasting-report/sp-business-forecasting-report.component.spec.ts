import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpBusinessForecastingReportComponent } from './sp-business-forecasting-report.component';

describe('SpBusinessForecastingReportComponent', () => {
  let component: SpBusinessForecastingReportComponent;
  let fixture: ComponentFixture<SpBusinessForecastingReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpBusinessForecastingReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpBusinessForecastingReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
