import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlannerOrdersComponent } from './planner-orders.component';

describe('PlannerOrdersComponent', () => {
  let component: PlannerOrdersComponent;
  let fixture: ComponentFixture<PlannerOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlannerOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlannerOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
