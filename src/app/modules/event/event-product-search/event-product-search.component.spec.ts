import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventProductSearchComponent } from './event-product-search.component';

describe('EventProductSearchComponent', () => {
  let component: EventProductSearchComponent;
  let fixture: ComponentFixture<EventProductSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventProductSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventProductSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
