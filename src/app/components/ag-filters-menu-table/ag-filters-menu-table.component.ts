import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ColDef, GridReadyEvent } from 'ag-grid-community';
import { IOlympicData } from '../ag-pagination-table/olympic-data.interface';

@Component({
  selector: 'app-ag-filters-menu-table',
  templateUrl: './ag-filters-menu-table.component.html',
  styleUrls: ['./ag-filters-menu-table.component.scss']
})
export class AgFiltersMenuTableComponent implements OnInit {
  columnsList: ColDef[] = [
    { field: 'athlete', minWidth: 200 },
    { field: 'age' },
    { field: 'country' },
    { field: 'year' },
    { field: 'date' },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
    { field: 'total' }
  ];
  columns = new FormControl(this.columnsList);

  public columnDefs: ColDef[] = [
    { field: 'athlete', minWidth: 200 },
    { field: 'age' },
    { field: 'country' },
    { field: 'year' },
    { field: 'date' },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
    { field: 'total' },
  ];
  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
    // allow every column to be aggregated
    enableValue: true,
    // allow every column to be grouped
    enableRowGroup: true,
    // allow every column to be pivoted
    enablePivot: true,
    sortable: true,
    filter: true,
  };
  public autoGroupColumnDef: ColDef = {
    minWidth: 200,
  };
  public rowData!: IOlympicData[];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.columns.valueChanges.subscribe((selectChange: ColDef[] | null) => {
      this.columnDefs = selectChange ?? this.columnDefs;
    });
  }

  onGridReady(params: GridReadyEvent<IOlympicData>) {
    this.http
      .get<IOlympicData[]>(
        'https://www.ag-grid.com/example-assets/olympic-winners.json'
      )
      .subscribe((data) => (this.rowData = data));
  }
}
