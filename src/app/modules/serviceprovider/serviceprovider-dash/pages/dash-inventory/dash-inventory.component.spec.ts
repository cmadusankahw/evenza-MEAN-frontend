import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashInventoryComponent } from './dash-inventory.component';

describe('DashInventoryComponent', () => {
  let component: DashInventoryComponent;
  let fixture: ComponentFixture<DashInventoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashInventoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
