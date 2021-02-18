import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TechnicianModule } from './technician/technician.module';
import { SharedModule } from '../shared/shared.module';
import { MainRoutingModule } from './main-routing.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { UpdateProfileModule } from './update-profile/update-profile.module';
import { MainComponent } from './main.component';
import { CoreModule } from '../core/core.module';
import { UserModule } from './user/user.module';


@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule, CoreModule,
    MainRoutingModule,TechnicianModule, DashboardModule, UpdateProfileModule, UserModule,
  ],
  exports: [MainComponent]
})
export class MainModule { }
