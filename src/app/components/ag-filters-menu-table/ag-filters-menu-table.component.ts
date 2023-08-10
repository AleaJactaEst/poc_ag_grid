import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {
  ColDef,
  ColGroupDef,
  GridReadyEvent,
} from 'ag-grid-community';
import { IOlympicData } from '../ag-pagination-table/olympic-data.interface';

@Component({
  selector: 'app-ag-filters-menu-table',
  templateUrl: './ag-filters-menu-table.component.html',
  styleUrls: ['./ag-filters-menu-table.component.scss']
})
export class AgFiltersMenuTableComponent implements OnInit {
  groupColumnsControls = new FormGroup({});


  public columnDefs: ColGroupDef[] = [
    {
      headerName: 'Athlete Details',
      groupId: 'athleteDetails',
      children: [
        {
          field: 'athlete',
          minWidth: 200,
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
      groupId: 'sportsResults',
      children: [
        { field: 'gold' },
        { field: 'silver' },
        { field: 'bronze' },
        { field: 'total' },
      ]
    }
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
    this.initFormControls();
  }

  initFormControls(): void {
    this.columnDefs.map((columnGroup: ColGroupDef) => {
      if (columnGroup.groupId) {
        this.groupColumnsControls.addControl(columnGroup.groupId, new FormGroup({
          subColumns: new FormControl(columnGroup.children),
          checked: new FormControl(false)
        }));
      }
    });
    console.log('this.groupColumnsControls:', this.groupColumnsControls);
  }

  onGridReady(params: GridReadyEvent<IOlympicData>) {
    this.http
      .get<IOlympicData[]>(
        'https://www.ag-grid.com/example-assets/olympic-winners.json'
      )
      .subscribe((data) => (this.rowData = data));
  }

  selectionChanged(subColumns: any, columnsGroupname: any): void {
    console.log('subColumns.value:', subColumns.value);
    console.log('columnsGroupname:', columnsGroupname);
  }

  getColumnGroup(groupId: string): any {
    // this.columnDefs.find(columnGroup => columnGroup.headerName === groupName);
    return this.columnDefs.find(columnGroup => columnGroup.groupId === groupId)?.children ?? [];
  }

  getSubColumns(columnName: string): any {

  }

  toggleColumnGroup(info: string | undefined): void {
    console.log('info:', info);
  }
}
