import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxsModule } from '@ngxs/store';
import { TasksState } from '../state/task.state';
import { PureTaskListComponent } from './pure-task-list/pure-task-list.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskComponent } from './task/task.component';
import { PureInboxScreenComponent } from './pure-inbox-screen/pure-inbox-screen.component';
import { InboxScreenComponent } from './inbox-screen/inbox-screen.component';

@NgModule({
  declarations: [
    TaskComponent,
    TaskListComponent,
    PureTaskListComponent,
    PureInboxScreenComponent,
    InboxScreenComponent,
  ],
  imports: [CommonModule, NgxsModule.forFeature([TasksState])],
  exports: [InboxScreenComponent, PureInboxScreenComponent],
})
export class TaskModule {}
