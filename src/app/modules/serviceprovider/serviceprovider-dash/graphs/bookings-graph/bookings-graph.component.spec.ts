import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingsGraphComponent } from './bookings-graph.component';

describe('BookingsGraphComponent', () => {
  let component: BookingsGraphComponent;
  let fixture: ComponentFixture<BookingsGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingsGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingsGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
