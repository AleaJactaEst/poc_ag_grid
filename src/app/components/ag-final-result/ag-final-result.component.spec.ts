import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgFinalResultComponent } from './ag-final-result.component';

describe('FinalResultComponent', () => {
  let component: AgFinalResultComponent;
  let fixture: ComponentFixture<AgFinalResultComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgFinalResultComponent]
    });
    fixture = TestBed.createComponent(AgFinalResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
