import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupSelectComponent } from './signup-select.component';

describe('SignupSelectComponent', () => {
  let component: SignupSelectComponent;
  let fixture: ComponentFixture<SignupSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
