import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TechnicianRoutingModule } from './technician-routing.module';
import { TechnicianComponent } from './technician.component';
import { ViewAssignedIncidentsComponent } from './pages/view-assigned-incidents/view-assigned-incidents.component';
import { AcceptRejectDialogComponent } from './components/accept-reject-dialog/accept-reject-dialog.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [TechnicianComponent, ViewAssignedIncidentsComponent, AcceptRejectDialogComponent],
  imports: [
    CommonModule,
    TechnicianRoutingModule,
    SharedModule
  ],
  exports: [AcceptRejectDialogComponent]
})
export class TechnicianModule { }
