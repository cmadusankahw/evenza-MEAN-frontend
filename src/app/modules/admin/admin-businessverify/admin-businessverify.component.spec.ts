import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBusinessverifyComponent } from './admin-businessverify.component';

describe('AdminBusinessverifyComponent', () => {
  let component: AdminBusinessverifyComponent;
  let fixture: ComponentFixture<AdminBusinessverifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminBusinessverifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBusinessverifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
