import { StatusRoutingModule } from './status-routing/status-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusListComponent } from './status-list/status-list.component';
import { MaterialModule } from '../../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StatusDetailsComponent } from './status-details/status-details.component';
import { StatusUpdateComponent } from './status-update/status-update.component';

@NgModule({
  declarations: [StatusListComponent, StatusDetailsComponent, StatusUpdateComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    StatusRoutingModule
  ]
})
export class StatusModule { }
