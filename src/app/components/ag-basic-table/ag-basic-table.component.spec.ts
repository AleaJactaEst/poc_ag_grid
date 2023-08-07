import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgBasicTableComponent } from './ag-basic-table.component';

describe('AgBasicTableComponent', () => {
  let component: AgBasicTableComponent;
  let fixture: ComponentFixture<AgBasicTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgBasicTableComponent]
    });
    fixture = TestBed.createComponent(AgBasicTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
