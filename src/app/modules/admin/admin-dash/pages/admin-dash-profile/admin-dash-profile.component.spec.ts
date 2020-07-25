import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashProfileComponent } from './admin-dash-profile.component';

describe('AdminDashProfileComponent', () => {
  let component: AdminDashProfileComponent;
  let fixture: ComponentFixture<AdminDashProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminDashProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDashProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
