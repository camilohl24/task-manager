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
  private cdr = inject(ChangeDetectorRef);
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

  form = this.formBuilder.group({
    title: [''],
    description: [''],
    assignedTo: [''],
    dueDate: [''],
  });
  ngOnInit() {
    this.taskService.getTasks().subscribe((data) => {
      this.tasks = [...data];
      this.cdr.detectChanges();
    });
  }
  selectedTask: TaskItem | null = null;

   createTask(){
    this.taskService.createTask(this.form.value as TaskItemRequest).subscribe(data => {
      this.tasks = [...this.tasks, data]
      this.cdr.detectChanges();
      this.showModal = false;
      this.form.reset();
    })
  }
  openCreate(){
    this.selectedTask = null
    this.form.reset()
    this.showModal = true
  }
  openEdit(task: TaskItem){
    this.selectedTask = task
    this.form.patchValue({
      title:  task.title,
      description: task.description,
      assignedTo: task.assignedTo,
      dueDate: task.dueDate
    })
    this.showModal = true
  }

  updateTask(){
    if(!this.selectedTask) return
    this.taskService.updateTask(this.selectedTask.id, this.form.value as TaskItemRequest).subscribe(() => {
      this.tasks = this.tasks.map(t =>
        t.id === this.selectedTask!.id
        ? {...t, ...this.form.value as TaskItemRequest}
        : t
      )
      this.cdr.detectChanges()
      this.showModal = false
      this.selectedTask = null
      this.form.reset()
    })
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe((data) => {
      this.tasks = this.tasks.filter((t) => t.id !== id);
      this.cdr.detectChanges();
    });
  }

  changeStatus(id: number, status: string){
    this.taskService.updateStatus(id, status).subscribe(() =>{
      const task = this.tasks.find(t => t.id === id)
      if(task){
        task.status = status as TaskItemStatus
        this.tasks = [...this.tasks]
        this.cdr.detectChanges();
      }
    })
  }

  handleSubmit(){
    if(this.selectedTask){
      this.updateTask()
    }
    else{
      this.createTask()
    }
  }
}
