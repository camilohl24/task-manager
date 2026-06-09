import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TaskItem, TaskItemStatus } from '../task.model';

@Component({
  selector: 'app-task-card',
  imports: [],
  templateUrl: './task-card.html',
  styleUrl: './task-card.css',
})
export class TaskCard {
  @Input() task!: TaskItem;

  @Output() onDelete = new EventEmitter<number>();
  @Output() onEdit = new EventEmitter<TaskItem>();
  @Output() onStatusChange = new EventEmitter<{ id: number; status: string }>();

  delete() {
    this.onDelete.emit(this.task.id);
  }
  edit() {
    this.onEdit.emit(this.task);
  }
  changeStatus(status: string) {
    this.onStatusChange.emit({ id: this.task.id, status });
  }

  formatDate(date: string | undefined): string {
    if (!date) return '';
    return new Date(date).toLocaleDateString('es-CO', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  }
}
