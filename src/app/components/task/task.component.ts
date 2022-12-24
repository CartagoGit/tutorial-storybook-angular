import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent {
  @Input() task: Task;

  @Output() onPinTask = new EventEmitter<string>();
  @Output() onArchiveTask = new EventEmitter<string>();

  constructor() {}

  /**
   * ? Metodo del componente para saltar en el evento onPin
   */
  public onPin(id: string): void {
    this.onPinTask.emit(id);
  }

  /**
   * ? Metodo del componente para saltar en el evento onArchive
   */
  public onArchive(id: string): void {
    this.onArchiveTask.emit(id);
  }
}
