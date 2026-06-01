import { Component, signal } from '@angular/core';
import { TaskList } from './tasks/task-list/task-list';

@Component({
  selector: 'app-root',
  imports: [TaskList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('TaskManager.web');
}
