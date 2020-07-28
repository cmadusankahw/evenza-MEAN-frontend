import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceProductCategoriesComponent } from './service-product-categories.component';

describe('ServiceProductCategoriesComponent', () => {
  let component: ServiceProductCategoriesComponent;
  let fixture: ComponentFixture<ServiceProductCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceProductCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceProductCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
