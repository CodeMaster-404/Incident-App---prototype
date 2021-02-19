import { IncidentUpdateComponent } from './../incident-update/incident-update.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { IncidentListComponent } from '../incident-list/incident-list.component';
import { MaterialModule } from '../../../material/material.module';
import { IncidentDetailsComponent } from '../incident-details/incident-details.component';

const routes: Routes = [
  { path: 'incidents', component: IncidentListComponent },
  { path: 'details/:id', component: IncidentDetailsComponent},
  { path: 'update/:id', component: IncidentUpdateComponent }
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
export class IncidentRoutingModule { }
