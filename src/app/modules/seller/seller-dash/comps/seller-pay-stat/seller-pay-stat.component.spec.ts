import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerPayStatComponent } from './seller-pay-stat.component';

describe('SellerPayStatComponent', () => {
  let component: SellerPayStatComponent;
  let fixture: ComponentFixture<SellerPayStatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerPayStatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerPayStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
