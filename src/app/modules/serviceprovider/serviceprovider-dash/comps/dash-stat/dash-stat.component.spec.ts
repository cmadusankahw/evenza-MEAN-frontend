import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashStatComponent } from './dash-stat.component';

describe('DashStatComponent', () => {
  let component: DashStatComponent;
  let fixture: ComponentFixture<DashStatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashStatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
