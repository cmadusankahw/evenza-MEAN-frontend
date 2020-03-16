import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustServiceDetailsComponent } from './cust-service-details.component';

describe('CustServiceDetailsComponent', () => {
  let component: CustServiceDetailsComponent;
  let fixture: ComponentFixture<CustServiceDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustServiceDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustServiceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
