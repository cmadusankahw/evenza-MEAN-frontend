import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessOpenDaysComponent } from './business-open-days.component';

describe('BusinessOpenDaysComponent', () => {
  let component: BusinessOpenDaysComponent;
  let fixture: ComponentFixture<BusinessOpenDaysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessOpenDaysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessOpenDaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
