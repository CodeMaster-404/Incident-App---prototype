import { ReportListComponent } from './../report-list/report-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from '../../../material/material.module';
import { ReportDetailsComponent } from '../report-details/report-details.component';

const routes: Routes = [
  { path: 'reports', component: ReportListComponent },
  { path: 'details/:id', component: ReportDetailsComponent}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
})
export class ReportRoutingModule { }
