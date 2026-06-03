import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { TaskService } from '../task.service';
import { TaskItem, TaskItemRequest, TaskItemStatus } from '../task.model';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-list',
  imports: [ReactiveFormsModule],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
})
export class TaskList implements OnInit {
  private taskService = inject(TaskService);
  private formBuilder = inject(FormBuilder);
  tasks: TaskItem[] = [];

  get pendingTasks() {
    return this.tasks.filter((t) => t.status === TaskItemStatus.Pending);
  }
  get inProgressTasks() {
    return this.tasks.filter((t) => t.status === TaskItemStatus.InProgress);
  }
  get doneTasks() {
    return this.tasks.filter((t) => t.status === TaskItemStatus.Done);
  }
  showModal = false;

  createTask(){
    this.taskService.createTask(this.form.value as TaskItemRequest).subscribe(data => {
      this.tasks = [...this.tasks, data]
      this.showModal = false;
      this.form.reset();
    })
  }

  form = this.formBuilder.group({
    title: [''],
    description: [''],
    assignedTo: [''],
    dueDate: [''],
  });
  ngOnInit() {
    this.taskService.getTasks().subscribe((data) => {
      this.tasks = [...data];
    });
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe((data) => {
      this.tasks = this.tasks.filter((t) => t.id !== id);
    });
  }
}
