import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../Sections/home/home.component';
import { NotFoundComponent } from '../error-pages/not-found/not-found.component';
import { ServerErrorComponent } from '../error-pages/server-error/server-error.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  //{ path: 'role', loadChildren: () => import('../Sections/role/role.module').then(m => m.RoleModule) },
  { path: 'report', loadChildren: () => import('../Sections/report/report.module').then(m => m.ReportModule) },
  { path: 'incident', loadChildren: () => import('../Sections/incident/incident.module').then(m => m.IncidentModule) },
  { path: 'task', loadChildren: () => import('../Sections/task/task.module').then(m => m.TaskModule) },
  { path: 'status', loadChildren: () => import('../Sections/status/status.module').then(m => m.StatusModule) },
  { path: 'user', loadChildren: () => import('../Sections/user/user.module').then(m => m.UserModule) },
  { path: '404', component: NotFoundComponent},
  { path: '500', component: ServerErrorComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/404', pathMatch: 'full' }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class RoutingModule { }
