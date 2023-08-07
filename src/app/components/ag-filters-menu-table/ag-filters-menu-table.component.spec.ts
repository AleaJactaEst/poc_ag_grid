import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgFiltersMenuTableComponent } from './ag-filters-menu-table.component';

describe('AgFiltersMenuTableComponent', () => {
  let component: AgFiltersMenuTableComponent;
  let fixture: ComponentFixture<AgFiltersMenuTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgFiltersMenuTableComponent]
    });
    fixture = TestBed.createComponent(AgFiltersMenuTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
