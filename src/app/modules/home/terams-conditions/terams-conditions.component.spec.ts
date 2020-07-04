import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeramsConditionsComponent } from './terams-conditions.component';

describe('TeramsConditionsComponent', () => {
  let component: TeramsConditionsComponent;
  let fixture: ComponentFixture<TeramsConditionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeramsConditionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeramsConditionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
