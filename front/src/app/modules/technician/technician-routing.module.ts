import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewAssignedIncidentsComponent } from './pages/view-assigned-incidents/view-assigned-incidents.component';

const routes: Routes = [
  { path: '', redirectTo: 'view-assigned-incidents', pathMatch: 'full' },
  { path: 'view-assigned-incidents', component: ViewAssignedIncidentsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TechnicianRoutingModule { }
