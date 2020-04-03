import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashPurchaseHistoryComponent } from './dash-purchase-history.component';

describe('DashPurchaseHistoryComponent', () => {
  let component: DashPurchaseHistoryComponent;
  let fixture: ComponentFixture<DashPurchaseHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashPurchaseHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashPurchaseHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
