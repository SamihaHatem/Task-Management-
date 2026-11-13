import { Component, inject } from '@angular/core';
import { TasksServices } from '../../../../core/services/tasksServices/tasks-services';

@Component({
  selector: 'app-tasks-page',
  imports: [],
  templateUrl: './tasks-page.html',
  styleUrl: './tasks-page.scss',
})
export class TasksPage {
  private readonly tasksApi = inject(TasksServices);

  readonly tasks = this.tasksApi.tasksResource;
}
