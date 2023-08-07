import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgPaginationTableComponent } from './ag-pagination-table.component';

describe('AgPaginationTableComponent', () => {
  let component: AgPaginationTableComponent;
  let fixture: ComponentFixture<AgPaginationTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgPaginationTableComponent]
    });
    fixture = TestBed.createComponent(AgPaginationTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
