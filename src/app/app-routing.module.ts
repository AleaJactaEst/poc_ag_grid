import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppConstants } from './app.constant';
import {
  AgBasicTableComponent,
  AgPaginationTableComponent,
  AgServerSidePaginationTableComponent,
  AgFiltersMenuTableComponent,
  AgFinalResultComponent
} from './components';

const routes: Routes = [
  { path: AppConstants.exoAgBasicTable.path, component: AgBasicTableComponent },
  { path: AppConstants.exoAgPaginationTable.path, component: AgPaginationTableComponent },
  { path: AppConstants.exoAgFiltersMenuTable.path, component: AgFiltersMenuTableComponent },
  { path: AppConstants.exoAgServerSidePaginationTable.path, component: AgServerSidePaginationTableComponent },
  { path: AppConstants.exoFinalResultTable.path, component: AgFinalResultComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
