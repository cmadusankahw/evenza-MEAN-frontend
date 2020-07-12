import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayStatComponent } from './pay-stat.component';

describe('PayStatComponent', () => {
  let component: PayStatComponent;
  let fixture: ComponentFixture<PayStatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayStatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
