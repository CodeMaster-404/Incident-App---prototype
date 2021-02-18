import { UserUpdateComponent } from './../user-update/user-update.component';
import { UserListComponent } from './../user-list/user-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from '../../../material/material.module';
import { UserDetailsComponent } from '../user-details/user-details.component';

const routes: Routes = [
  { path: 'users', component: UserListComponent },
  { path: 'details/:id', component: UserDetailsComponent},
  { path: 'update/:id', component: UserUpdateComponent }
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
export class UserRoutingModule { }
