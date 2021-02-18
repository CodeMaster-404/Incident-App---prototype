import { TaskDetailsComponent } from './../task-details/task-details.component';
import { TaskListComponent } from './../task-list/task-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from '../../../material/material.module';

const routes: Routes = [
  { path: 'tasks', component: TaskListComponent },
  { path: 'details/:id', component: TaskDetailsComponent},
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
export class TaskRoutingModule { }
