import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerNoBprofileComponent } from './seller-no-bprofile.component';

describe('SellerNoBprofileComponent', () => {
  let component: SellerNoBprofileComponent;
  let fixture: ComponentFixture<SellerNoBprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerNoBprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerNoBprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
