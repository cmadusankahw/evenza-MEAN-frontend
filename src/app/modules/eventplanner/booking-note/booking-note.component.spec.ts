import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingNoteComponent } from './booking-note.component';

describe('BookingNoteComponent', () => {
  let component: BookingNoteComponent;
  let fixture: ComponentFixture<BookingNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingNoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
