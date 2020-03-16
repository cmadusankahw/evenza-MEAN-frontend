import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashBusinessProfileComponent } from './dash-business-profile.component';

describe('DashBusinessProfileComponent', () => {
  let component: DashBusinessProfileComponent;
  let fixture: ComponentFixture<DashBusinessProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashBusinessProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashBusinessProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
