import { FlexLayoutModule } from '@angular/flex-layout';
import { ReportRoutingModule } from './report-routing/report-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportListComponent } from './report-list/report-list.component';
import { MaterialModule } from '../../material/material.module';
import { ReportDetailsComponent } from './report-details/report-details.component';

@NgModule({
  declarations: [ReportListComponent, ReportDetailsComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    ReportRoutingModule
  ]
})
export class ReportModule { }
