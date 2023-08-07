import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgServerSidePaginationTableComponent } from './ag-server-side-pagination-table.component';

describe('AgServerSidePaginationTableComponent', () => {
  let component: AgServerSidePaginationTableComponent;
  let fixture: ComponentFixture<AgServerSidePaginationTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgServerSidePaginationTableComponent]
    });
    fixture = TestBed.createComponent(AgServerSidePaginationTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
