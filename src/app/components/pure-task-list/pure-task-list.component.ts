import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-pure-task-list',
  templateUrl: './pure-task-list.component.html',
  styleUrls: ['./pure-task-list.component.css'],
})
export class PureTaskListComponent {
  /** La lista de tareas */
  // @Input() tasks: Task[] = [];
  @Input()
  set tasks(arr: Task[]) {
    this.tasksInOrder = [
      ...arr.filter((t) => t.state === 'TASK_PINNED'),
      ...arr.filter((t) => t.state !== 'TASK_PINNED'),
    ];
  }

  /**
   * Propiedad del componente para definir el orden de las tareas.
   */
  tasksInOrder: Task[] = [];

  /** Comprueba si está en estado de carga */
  @Input() loading = false;

  /** Evento para cambiar la tarea a anclada */
  // tslint:disable-next-line: no-output-on-prefix
  @Output()
  onPinTask = new EventEmitter<Event>();

  /** Evento para cambiar la tarea a archivada */
  // tslint:disable-next-line: no-output-on-prefix
  @Output()
  onArchiveTask = new EventEmitter<Event>();

  constructor() {}
}
