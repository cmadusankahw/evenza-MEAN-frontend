import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventAgendaComponent } from './event-agenda.component';

describe('EventAgendaComponent', () => {
  let component: EventAgendaComponent;
  let fixture: ComponentFixture<EventAgendaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventAgendaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventAgendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
