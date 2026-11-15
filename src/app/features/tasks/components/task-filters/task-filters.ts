import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  input,
  output,
} from '@angular/core';
import { AssigneeI } from '../../../../core/models/assignee-i';
import { TaskFilterI } from '../../../../core/models/task-filter-i';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TaskStatus, TaskPriority } from '../../../../core/models/task-i';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-task-filters',
  imports: [ReactiveFormsModule],
  templateUrl: './task-filters.html',
  styleUrl: './task-filters.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskFilters {
  readonly assignees = input.required<AssigneeI[]>();
  private readonly destroyRef = inject(DestroyRef);
  readonly filtersChange = output<TaskFilterI>();

  readonly filtersForm = new FormGroup({
    search: new FormControl('', { nonNullable: true }),
    status: new FormControl<TaskStatus | 'all'>('all', {
      nonNullable: true,
    }),
    priority: new FormControl<TaskPriority | 'all'>('all', {
      nonNullable: true,
    }),
    assigneeId: new FormControl('all', { nonNullable: true }),
  });

  constructor() {
    this.filtersForm.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.filtersChange.emit(this.filtersForm.getRawValue());
      });
  }

}
