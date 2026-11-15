import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { TaskI } from '../../../../core/models/task-i';
import { TaskCard } from '../task-card/task-card';

@Component({
  selector: 'app-task-board',
  imports: [TaskCard],
  templateUrl: './task-board.html',
  styleUrl: './task-board.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskBoard {
  readonly tasks = input.required<TaskI[]>();
  readonly editTask = output<TaskI>();
  readonly deleteTask = output<TaskI>();
  readonly columns = computed(() => [
    {
      status: 'todo',
      title: 'To Do',
      tasks: this.tasks().filter((task) => task.status === 'todo'),
    },
    {
      status: 'in_progress',
      title: 'In Progress',
      tasks: this.tasks().filter((task) => task.status === 'in_progress'),
    },
    {
      status: 'done',
      title: 'Done',
      tasks: this.tasks().filter((task) => task.status === 'done'),
    },
  ]);
}
