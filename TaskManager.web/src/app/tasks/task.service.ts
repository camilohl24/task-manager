import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TaskItem, TaskItemRequest } from './task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5198/api/taskitems';

  getTasks(): Observable<TaskItem[]>{
    return this.http.get<TaskItem[]>(this.apiUrl);
  }

  createTask(data: TaskItemRequest): Observable<TaskItem>{
    return this.http.post<TaskItem>(this.apiUrl, data)
  }

  updateTask(id: number, data:TaskItemRequest): Observable<void>{
    return this.http.put<void>(`${this.apiUrl}/${id}`, data)
  }

  deleteTask(id: number): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
  }
  updateStatus(id: number, status: string): Observable<void>{
    return this.http.patch<void>(`${this.apiUrl}/${id}/status`,JSON.stringify(status),{
      headers: {'Content-Type' : 'application/json'}
    })
  }

}
