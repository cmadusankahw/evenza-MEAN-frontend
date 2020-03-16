import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashReportsComponent } from './dash-reports.component';

describe('DashReportsComponent', () => {
  let component: DashReportsComponent;
  let fixture: ComponentFixture<DashReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
