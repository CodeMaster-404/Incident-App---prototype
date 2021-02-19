import { StatusUpdateComponent } from './../status-update/status-update.component';
import { StatusListComponent } from './../status-list/status-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from '../../../material/material.module';
import { StatusDetailsComponent } from '../status-details/status-details.component';

const routes: Routes = [
  { path: 'statuses', component: StatusListComponent },
  { path: 'details/:id', component: StatusDetailsComponent},
  { path: 'update', component: StatusUpdateComponent }
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
export class StatusRoutingModule { }
