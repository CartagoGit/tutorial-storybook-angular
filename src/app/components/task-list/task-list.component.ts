import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Task } from 'src/app/models/task.model';
import { ArchiveTask, PinTask, TasksState } from 'src/app/state/task.state';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
})
export class TaskListComponent {
  @Select(TasksState.getAllTasks) tasks$: Observable<Task[]>;

  constructor(private store: Store) {}

  /**
   * Método de componente para activar el evento archiveTask
   */
  public archiveTask(id: string) {
    this.store.dispatch(new ArchiveTask(id));
  }

  /**
   * Método de componente para activar el evento pinTask
   */
  public pinTask(id: string) {
    this.store.dispatch(new PinTask(id));
  }
}

// @Component({
//   selector: 'app-task-list',
//   templateUrl: './task-list.component.html',
//   styleUrls: ['./task-list.component.css'],
// })
// export class TaskListComponent {
//   /** La lista de tareas */
//   // @Input() tasks: Task[] = [];
//   @Input()
//   set tasks(arr: Task[]) {
//     this.tasksInOrder = [
//       ...arr.filter((t) => t.state === 'TASK_PINNED'),
//       ...arr.filter((t) => t.state !== 'TASK_PINNED'),
//     ];
//   }

//   /**
//    * Propiedad del componente para definir el orden de las tareas.
//    */
//   tasksInOrder: Task[] = [];

//   /** Comprueba si está en estado de carga */
//   @Input() loading = false;

//   /** Evento para cambiar la tarea a anclada */
//   // tslint:disable-next-line: no-output-on-prefix
//   @Output()
//   onPinTask = new EventEmitter<Event>();

//   /** Evento para cambiar la tarea a archivada */
//   // tslint:disable-next-line: no-output-on-prefix
//   @Output()
//   onArchiveTask = new EventEmitter<Event>();

//   constructor() {}
// }
