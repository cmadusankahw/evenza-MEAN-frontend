import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustBprofileComponent } from './cust-bprofile.component';

describe('CustBprofileComponent', () => {
  let component: CustBprofileComponent;
  let fixture: ComponentFixture<CustBprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustBprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustBprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
