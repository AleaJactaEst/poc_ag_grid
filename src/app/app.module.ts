import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AgGridModule } from 'ag-grid-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  AgBasicTableComponent,
  AgPaginationTableComponent,
  AgServerSidePaginationTableComponent,
  AgFiltersMenuTableComponent
} from './components';

@NgModule({
  declarations: [
    AppComponent,
    AgBasicTableComponent,
    AgPaginationTableComponent,
    AgServerSidePaginationTableComponent,
    AgFiltersMenuTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatSidenavModule,
    AgGridModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
