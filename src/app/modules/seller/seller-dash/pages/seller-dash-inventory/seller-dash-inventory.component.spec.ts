import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerDashInventoryComponent } from './seller-dash-inventory.component';

describe('SellerDashInventoryComponent', () => {
  let component: SellerDashInventoryComponent;
  let fixture: ComponentFixture<SellerDashInventoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerDashInventoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerDashInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
