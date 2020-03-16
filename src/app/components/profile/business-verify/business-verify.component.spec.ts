import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessVerifyComponent } from './business-verify.component';

describe('BusinessVerifyComponent', () => {
  let component: BusinessVerifyComponent;
  let fixture: ComponentFixture<BusinessVerifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessVerifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
