import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpServieDetailsReportComponent } from './sp-servie-details-report.component';

describe('SpServieDetailsReportComponent', () => {
  let component: SpServieDetailsReportComponent;
  let fixture: ComponentFixture<SpServieDetailsReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpServieDetailsReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpServieDetailsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
