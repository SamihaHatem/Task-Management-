import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TasksServices } from './core/services/tasksServices/tasks-services';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('task-management-dashboard');
}
