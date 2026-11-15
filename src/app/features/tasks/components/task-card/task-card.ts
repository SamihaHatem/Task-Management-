import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { TaskI } from '../../../../core/models/task-i';
import { DatePipe, TitleCasePipe } from '@angular/common';
@Component({
  selector: 'app-task-card',
  imports: [TitleCasePipe, DatePipe],
  templateUrl: './task-card.html',
  styleUrl: './task-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskCard {
  readonly task = input.required<TaskI>();
  readonly edit = output<TaskI>();
  readonly delete = output<TaskI>();
}
