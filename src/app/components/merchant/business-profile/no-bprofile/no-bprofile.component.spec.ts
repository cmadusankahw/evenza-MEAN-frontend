import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoBprofileComponent } from './no-bprofile.component';

describe('NoBprofileComponent', () => {
  let component: NoBprofileComponent;
  let fixture: ComponentFixture<NoBprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoBprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoBprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
