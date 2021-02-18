import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogComponent } from './log/log/log.component';
import { ViewComponent } from './view/view/view.component';
import { HomeComponent } from './home/home/home.component';
import { IncidentEditComponent } from './incident-edit/incident-edit/incident-edit.component';
const routes: Routes = [
  { path: '', redirectTo: 'log', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'log', component: LogComponent },
  { path: 'view', component: ViewComponent },
  { path: 'incident-edit', component: IncidentEditComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
