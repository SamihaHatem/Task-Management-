import { Injectable } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { TaskI } from '../../models/task-i';

@Injectable({
  providedIn: 'root',
})
export class TasksServices {
  private readonly apiUrl = 'http://localhost:3000/tasks';

  readonly tasksResource = httpResource<TaskI[]>(
    () => this.apiUrl
  );
}
