import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessStatComponent } from './business-stat.component';

describe('BusinessStatComponent', () => {
  let component: BusinessStatComponent;
  let fixture: ComponentFixture<BusinessStatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessStatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
