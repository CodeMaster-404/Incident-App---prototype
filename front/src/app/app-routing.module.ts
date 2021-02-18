import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthCanActivateChildGuard } from './core/guards/auth-can-activate-child.guard';
import { ConfirmEmailComponent } from './core/pages/confirm-email/confirm-email.component';
import { AuthComponent } from './modules/auth/auth.component';
import { MainComponent } from './modules/main.component';

const routes: Routes = [
  { path: '',
    component: MainComponent,
    loadChildren: () => import('./modules/main.module').then(m => m.MainModule),
    canActivateChild: [AuthCanActivateChildGuard] },
  { path: 'auth',
    component: AuthComponent,
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule) },
  {
    path: 'confirm-email',
    component: ConfirmEmailComponent
  }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
