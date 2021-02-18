import { UserRoutingModule } from './user-routing/user-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { MaterialModule } from '../../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserDataComponent } from './user-details/user-data/user-data.component';
import { UserUpdateComponent } from './user-update/user-update.component';


@NgModule({
  declarations: [UserListComponent, UserDetailsComponent, UserDataComponent, UserUpdateComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    UserRoutingModule
  ]
})
export class UserModule { }
