import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AgGridAngular } from 'ag-grid-angular';
import { CellClickedEvent, ColDef, GridReadyEvent, ICellRendererParams } from 'ag-grid-community';
import { Observable } from 'rxjs';

import { CustomCellComponent } from '../custom-cell/custom-cell.component';

@Component({
  selector: 'app-ag-basic-table',
  templateUrl: './ag-basic-table.component.html',
  styleUrls: ['./ag-basic-table.component.scss']
})
export class AgBasicTableComponent {

  // Each Column Definition results in one Column.
  public columnDefs: ColDef[] = [
    {
      field: 'make',
      cellRenderer: CustomCellComponent,
      cellRendererParams: {
        icon: 'edit'
      }
    },
    { field: 'model' },
    { field: 'price', cellRenderer: (params: ICellRendererParams) => `<span>${ params.value }$</span>` }
  ];

  // DefaultColDef sets props common to all Columns
  public defaultColDef: ColDef = {
    sortable: true,
    resizable: true,
    flex: 1,
    minWidth: 100,
  };

  // Data that gets displayed in the grid
  public rowData$!: Observable<any[]>;

  // For accessing the Grid's API
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  constructor(private http: HttpClient) {}

  // Example load data from server
  onGridReady(params: GridReadyEvent) {
    console.log('onGridReady | params:', params);
    this.rowData$ = this.http
      .get<any[]>('https://www.ag-grid.com/example-assets/row-data.json');
    // params.api.sizeColumnsToFit();
  }

  // Example of consuming Grid Event
  onCellClicked( e: CellClickedEvent): void {
    console.log('cellClicked', e);
  }

  // Example using Grid's API
  clearSelection(): void {
    this.agGrid.api.deselectAll();
  }
}
