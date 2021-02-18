// import { HomescreenComponent } from './homescreen/homescreen.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthCanActivateChildGuard } from '../core/guards/auth-can-activate-child.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TechnicianComponent } from './technician/technician.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  { path: 'dashboard',
    component: DashboardComponent,
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivateChild: [AuthCanActivateChildGuard] },
  { path: 'technician',
    component: TechnicianComponent,
    loadChildren: () => import('./technician/technician.module').then(m => m.TechnicianModule),
    canActivateChild: [AuthCanActivateChildGuard] },
    { path: 'user',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule),
    canActivateChild: [AuthCanActivateChildGuard]},
  { path: 'profile',
    loadChildren: () => import('./update-profile/update-profile.module').then(m => m.UpdateProfileModule),
    canActivateChild: [AuthCanActivateChildGuard]},
  // { path: 'homescreen', component: HomescreenComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
