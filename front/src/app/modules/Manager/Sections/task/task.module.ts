import { TaskRoutingModule } from './task-routing/task-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskListComponent } from './task-list/task-list.component';
import { MaterialModule } from '../../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { TaskUpdateComponent } from './task-update/task-update.component';

@NgModule({
  declarations: [TaskListComponent, TaskDetailsComponent, TaskUpdateComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    TaskRoutingModule
  ]
})
export class TaskModule { }
