import { inject, Injectable } from '@angular/core';
import { HttpClient, httpResource } from '@angular/common/http';
import { TaskI } from '../../models/task-i';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TasksServices {
  private readonly apiUrl = 'http://localhost:3000/tasks';

  readonly tasksResource = httpResource<TaskI[]>(
    () => this.apiUrl
  );

  private readonly http = inject(HttpClient);

  createTask(
    task: Omit<TaskI, 'id' | 'createdAt' | 'updatedAt' | 'isOverdue' | 'completedAt'>,
  ): Observable<TaskI> {
    const now = new Date().toISOString();

    const newTask: TaskI = {
      ...task,
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now,
      isOverdue: false,
      completedAt: ''
    };

    return this.http.post<TaskI>(this.apiUrl, newTask);
  }

  updateTask(
    id: string,
    task: Omit<
      TaskI,
      'id' | 'createdAt' | 'updatedAt' | 'isOverdue' | 'completedAt'
    >,
  ): Observable<TaskI> {
    const now = new Date().toISOString();

    const updatedTask = {
      ...task,
      updatedAt: now,
    };

    return this.http.patch<TaskI>(
      `${this.apiUrl}/${id}`,
      updatedTask,
    );
  }

  deleteTask(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
