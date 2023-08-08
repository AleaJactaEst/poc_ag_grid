import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

export interface MyCustomCellParams {
  icon?: string;
}

@Component({
  selector: 'app-custom-cell',
  template: `
    <mat-icon
      class="mat-icon-button"
      aria-hidden="false" 
      aria-label="Example home icon" 
      [fontIcon]="icon"></mat-icon>
    {{ value }}
  `,
  styles: [`
    .mat-icon-button {
      position: relative;
      top: 3px;
      height: 15px;
      font-size: 16px;
    }
  `]
})
export class CustomCellComponent implements ICellRendererAngularComp {
  value: any;
  icon: string = 'home';

  agInit(params: ICellRendererParams & MyCustomCellParams): void {
    // this.cellValue = this.getValueToDisplay(params);
    this.value = params.value;
    this.icon = params.icon ?? 'home';
    console.log('agInit | params:', params);
  }

  // gets called whenever the cell refreshes
  refresh(params: ICellRendererParams): boolean {
    // if we change content of the cell dynamically we should return true otherwise false(which is default)
    console.log('refresh | params:', params);
    return false;
  }
}
