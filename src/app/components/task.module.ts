import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxsModule } from '@ngxs/store';
import { TasksState } from '../state/task.state';
import { PureTaskListComponent } from './pure-task-list/pure-task-list.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskComponent } from './task/task.component';

@NgModule({
  declarations: [TaskComponent, TaskListComponent, PureTaskListComponent],
  imports: [CommonModule, NgxsModule.forFeature([TasksState])],
})
export class TaskModule {}
