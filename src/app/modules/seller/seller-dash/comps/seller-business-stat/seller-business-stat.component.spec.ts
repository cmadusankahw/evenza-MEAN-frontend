import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerBusinessStatComponent } from './seller-business-stat.component';

describe('SellerBusinessStatComponent', () => {
  let component: SellerBusinessStatComponent;
  let fixture: ComponentFixture<SellerBusinessStatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerBusinessStatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerBusinessStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
