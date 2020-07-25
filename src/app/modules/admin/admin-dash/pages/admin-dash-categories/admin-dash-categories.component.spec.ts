import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashCategoriesComponent } from './admin-dash-categories.component';

describe('AdminDashCategoriesComponent', () => {
  let component: AdminDashCategoriesComponent;
  let fixture: ComponentFixture<AdminDashCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminDashCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDashCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
