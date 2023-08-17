import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import {
  CheckboxSelectionCallbackParams,
  ColDef, ColGroupDef, GridApi,
  GridReadyEvent,
  HeaderCheckboxSelectionCallbackParams,
  IGroupCellRendererParams, IRowNode
} from 'ag-grid-community';

import { IOlympicData } from './olympic-data.interface';

@Component({
  selector: 'app-ag-pagination-table',
  templateUrl: './ag-pagination-table.component.html',
  styleUrls: ['./ag-pagination-table.component.scss']
})
export class AgPaginationTableComponent {
  rowsPerPage: number[] = [10, 20, 50, 100];
  private gridApi!: GridApi;
  selectedRows: IRowNode<any>[] = [];

  public columnDefs: (ColDef | ColGroupDef)[] = [
    {
      headerName: 'Athlete Details',
      children: [
        {
          field: 'athlete',
          minWidth: 170,
          checkboxSelection: function (params: CheckboxSelectionCallbackParams) {
            // we put checkbox on the name if we are not doing grouping
            return params.columnApi.getRowGroupColumns().length === 0;
          },
          headerCheckboxSelection: function (
            params: HeaderCheckboxSelectionCallbackParams
          ) {
            // we put checkbox on the name if we are not doing grouping
            return params.columnApi.getRowGroupColumns().length === 0;
          },
        },
        { field: 'age' },
        { field: 'country' },
        { field: 'year' },
        { field: 'date' },
        { field: 'sport' },
      ]
    },
    {
      headerName: 'Sports Results',
      children: [
        { field: 'gold' },
        { field: 'silver' },
        { field: 'bronze' },
        { field: 'total' },
      ]
    }
  ];
  public autoGroupColumnDef: ColDef = {
    headerName: 'Group',
    minWidth: 170,
    field: 'athlete',
    valueGetter: (params) => {
      if (params.node!.group) {
        return params.node!.key;
      } else {
        return params.data[params.colDef.field!];
      }
    },
    headerCheckboxSelection: true,
    cellRenderer: 'agGroupCellRenderer',
    cellRendererParams: {
      checkbox: true,
    } as IGroupCellRendererParams,
  };
  public defaultColDef: ColDef = {
    editable: true,
    sortable: true,
    resizable: true,
    filter: true,
    flex: 1,
    minWidth: 100,
  };
  public rowSelection: 'single' | 'multiple' = 'multiple';
  public rowGroupPanelShow: 'always' | 'onlyWhenGrouping' | 'never' = 'always';
  public pivotPanelShow: 'always' | 'onlyWhenPivoting' | 'never' = 'always';
  public rowData!: IOlympicData[];

  constructor(private http: HttpClient) {}

  onGridReady(params: GridReadyEvent<IOlympicData>): void {
    this.http
      .get<IOlympicData[]>(
        'https://www.ag-grid.com/example-assets/olympic-winners.json'
      )
      .subscribe((data) => (this.rowData = data));
    this.gridApi = params.api;
    this.gridApi.setDomLayout('autoHeight');
  }

  onBtnExport(): void {
    this.gridApi.exportDataAsCsv();
  }

  getSelectedRows(): void {
    this.selectedRows = this.gridApi.getSelectedNodes().map(rowNode => rowNode.data);
  }

  amountOfRows(amountOfRows: MatSelectChange) {
    this.gridApi.paginationSetPageSize(Number(amountOfRows.value));
  }
}
