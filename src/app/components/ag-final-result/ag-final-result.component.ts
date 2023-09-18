import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import {
  ColDef,
  ColGroupDef,
  DomLayoutType,
  GetRowIdFunc,
  GetRowIdParams,
  GridApi,
  GridReadyEvent,
  ICellRendererParams,
  IDatasource,
  IGetRowsParams,
  RowModelType,
  SortModelItem
} from 'ag-grid-community';

import { IOlympicData } from '../ag-pagination-table/olympic-data.interface';

@Component({
  selector: 'app-ag-final-result',
  templateUrl: './ag-final-result.component.html',
  styleUrls: ['./ag-final-result.component.scss']
})
export class AgFinalResultComponent implements OnInit {
  rowsPerPage: number[] = [10, 20, 50, 100];
  private gridApi!: GridApi;
  groupColumnsControls = new FormGroup({});
  columnDefsCopy!: ColGroupDef[];

  public columnDefs: ColGroupDef[] = [
    {
      headerName: '',
      groupId: 'additionalInfo',
      children: [
        {
          headerName: 'ID',
          maxWidth: 100,
          valueGetter: 'node.id',
          cellRenderer: (params: ICellRendererParams) => {
            if (params.value !== undefined) {
              return params.value;
            } else {
              return '<img src="https://www.ag-grid.com/example-assets/loading.gif">';
            }
          },
          // we don't want to sort by the row index, this doesn't make sense as the point
          // of the row index is to know the row index in what came back from the server
          sortable: false,
          suppressMenu: true,
        },
      ]
    },
    {
      headerName: 'Athlete Details',
      groupId: 'athleteDetails',
      children: [
        {
          field: 'athlete',
          minWidth: 50,
        },
        {
          field: 'age',
        },
        {
          field: 'country',
        },
        {
          field: 'year',
        },
        { field: 'date', filter: false },
        { field: 'sport', filter: false },
      ]
    },
    {
      headerName: 'Sports Results',
      groupId: 'sportsResults',
      children: [
        { field: 'gold', filter: false },
        { field: 'silver', filter: false },
        { field: 'bronze', filter: false },
        { field: 'total', filter: false },
      ]
    }
  ];

  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
    sortable: true,
    filter: true,
    resizable: true,
  };

  public domLayout: DomLayoutType = 'autoHeight';
  public rowSelection: 'single' | 'multiple' = 'multiple';
  public rowModelType: RowModelType = 'infinite';
  public cacheBlockSize = 100;
  public cacheOverflowSize = 2;
  public maxConcurrentDatasourceRequests = 2;
  public infiniteInitialRowCount = 1;
  public maxBlocksInCache = 2;
  public getRowId: GetRowIdFunc = (params: GetRowIdParams) => {
    return params.data.id;
  };
  public rowData!: IOlympicData[];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.initFormControls();
    this.toggleColumnGroup();
  }

  onGridReady(params: GridReadyEvent<IOlympicData>) {
    this.http
      .get<IOlympicData[]>(
        'https://www.ag-grid.com/example-assets/olympic-winners.json'
      )
      .subscribe((data) => {
        data.forEach((d: any, index: number) => {
          d.id = 'R' + (index + 1);
        });
        const dataSource: IDatasource = {
          rowCount: undefined,
          getRows: (params: IGetRowsParams) => {
            // At this point in your code, you would call the server.
            // To make the demo look real, wait for 500ms before returning
            setTimeout(() => {
              // take a slice of the total rows
              const dataAfterSortingAndFiltering = this.sortAndFilter(
                data,
                params.sortModel,
                params.filterModel
              );
              const rowsThisPage = dataAfterSortingAndFiltering.slice(
                params.startRow,
                params.endRow
              );
              // if on or after the last page, work out the last row.
              let lastRow = -1;
              if (dataAfterSortingAndFiltering.length <= params.endRow) {
                lastRow = dataAfterSortingAndFiltering.length;
              }
              // call the success callback
              params.successCallback(rowsThisPage, lastRow);
            }, 500);
          },
        };
        params.api!.setDatasource(dataSource);
      });
    this.gridApi = params.api;
  }

  initFormControls(): void {
    this.columnDefs.map((columnGroup: ColGroupDef) => {
      if (columnGroup.groupId) {
        this.groupColumnsControls.addControl(columnGroup.groupId, new FormGroup({
          subColumns: new FormControl(columnGroup.children),
          checked: new FormControl(true)
        }));
      }
    });

    this.groupColumnsControls.valueChanges.subscribe(() => this.toggleColumnGroup());
  }

  sortAndFilter(
    allOfTheData: any[],
    sortModel: SortModelItem[],
    filterModel: any
  ) {
    return this.sortData(sortModel, this.filterData(filterModel, allOfTheData));
  }

  sortData(sortModel: SortModelItem[], data: any[]) {
    const sortPresent = sortModel && sortModel.length > 0;
    if (!sortPresent) {
      return data;
    }
    // do an in memory sort of the data, across all the fields
    const resultOfSort = data.slice();
    resultOfSort.sort(function (a, b) {
      for (let k = 0; k < sortModel.length; k++) {
        const sortColModel = sortModel[k];
        const valueA = a[sortColModel.colId];
        const valueB = b[sortColModel.colId];
        // this filter didn't find a difference, move onto the next one
        if (valueA == valueB) {
          continue;
        }
        const sortDirection = sortColModel.sort === 'asc' ? 1 : -1;
        if (valueA > valueB) {
          return sortDirection;
        } else {
          return sortDirection * -1;
        }
      }
      // no filters found a difference
      return 0;
    });
    return resultOfSort;
  }

  amountOfRows(amountOfRows: MatSelectChange) {
    this.gridApi.paginationSetPageSize(Number(amountOfRows.value));
  }

  filterData(filterModel: any, data: any[]) {
    const filterPresent = filterModel && Object.keys(filterModel).length > 0;
    if (!filterPresent) {
      return data;
    }
    const resultOfFilter = [];
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      if (filterModel.age) {
        const age = item.age;
        const allowedAge = parseInt(filterModel.age.filter);
        // EQUALS = 1;
        // LESS_THAN = 2;
        // GREATER_THAN = 3;
        if (filterModel.age.type == 'equals') {
          if (age !== allowedAge) {
            continue;
          }
        } else if (filterModel.age.type == 'lessThan') {
          if (age >= allowedAge) {
            continue;
          }
        } else {
          if (age <= allowedAge) {
            continue;
          }
        }
      }
      if (filterModel.year) {
        if (filterModel.year.values.indexOf(item.year.toString()) < 0) {
          // year didn't match, so skip this record
          continue;
        }
      }
      if (filterModel.country) {
        if (filterModel.country.values.indexOf(item.country) < 0) {
          continue;
        }
      }
      resultOfFilter.push(item);
    }
    return resultOfFilter;
  }

  getColumnGroup(groupId: string): ColDef[] {
    return this.columnDefs.find(columnGroup => columnGroup.groupId === groupId)?.children ?? [];
  }

  getSubColumns(columnName: string): FormGroup {
    return this.groupColumnsControls.get(columnName) as FormGroup;
  }

  toggleColumnGroup(): void {
    this.columnDefsCopy = JSON.parse(JSON.stringify(this.columnDefs)).filter((column: any) => {
      column.children = this.getSubColumns(column.groupId ?? '')?.controls['subColumns'].value;
      return this.getSubColumns(column.groupId ?? '')?.controls['checked'].value;
    });
  }

  onBtnExport(): void {
    this.gridApi.exportDataAsCsv();
  }
}
