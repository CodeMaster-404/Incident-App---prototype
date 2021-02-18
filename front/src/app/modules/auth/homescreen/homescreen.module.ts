import { RegisterComponent } from './../pages/register/register.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../pages/login/login.component';
import { CoreModule } from 'src/app/core/core.module';
import { AuthRoutingModule } from '../auth-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
// import { AuthModule } from './../auth/auth.module';


const routes: Routes = [

    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent }

  ];


@NgModule({
  declarations: [ LoginComponent ],
  imports: [
      RouterModule.forChild(routes),
      CommonModule,
      CoreModule,
      AuthRoutingModule,
      SharedModule
  ],
  exports: [RouterModule]
})
export class HomeScreenModule { }
