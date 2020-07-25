import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashHomeComponent } from './admin-dash-home.component';

describe('AdminDashHomeComponent', () => {
  let component: AdminDashHomeComponent;
  let fixture: ComponentFixture<AdminDashHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminDashHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDashHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
