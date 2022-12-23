import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent {
  @Input() task: Task;

  @Output() onPinTask = new EventEmitter<Event>();
  @Output() onArchiveTask = new EventEmitter<Event>();

  constructor() {}

  /**
   * ? Metodo del componente para saltar en el evento onPin
   */
  public onPin(id: any): void {
    this.onPinTask.emit(id);
  }

  /**
   * ? Metodo del componente para saltar en el evento onArchive
   */
  public onArchive(id: any): void {
    this.onArchiveTask.emit(id);
  }
}
