import { Component, computed, inject, signal } from '@angular/core';
import { TasksServices } from '../../../../core/services/tasksServices/tasks-services';
import { TasksHeader } from '../../components/tasks-header/tasks-header';
import { TaskBoard } from '../../components/task-board/task-board';
import { TaskFilterI } from '../../../../core/models/task-filter-i';
import { TaskFilters } from '../../components/task-filters/task-filters';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TaskForm } from '../../components/task-form/task-form';
import { TaskI } from '../../../../core/models/task-i';

@Component({
  selector: 'app-tasks-page',
  imports: [TasksHeader, TaskBoard, TaskFilters, MatDialogModule],
  templateUrl: './tasks-page.html',
  styleUrl: './tasks-page.scss',
})
export class TasksPage {
  private readonly tasksApi = inject(TasksServices);
  private readonly dialog = inject(MatDialog);
  readonly tasks = this.tasksApi.tasksResource;
  readonly filters = signal<TaskFilterI>({
    search: '',
    status: 'all',
    priority: 'all',
    assigneeId: 'all',
  });

  readonly allTasks = computed(() => this.tasks.value() ?? []);

  readonly assignees = computed(() => {
    const uniqueAssignees = new Map(
      this.allTasks().map((task) => [task.assignee.id, task.assignee]),
    );

    return Array.from(uniqueAssignees.values());
  });

  readonly filteredTasks = computed(() => {
    const tasks = this.allTasks();
    const filters = this.filters();

    return tasks.filter((task) => {
      const searchTerm = filters.search.trim().toLowerCase();

      const matchesSearch =
        !searchTerm ||
        task.title.toLowerCase().includes(searchTerm) ||
        task.description.toLowerCase().includes(searchTerm);

      const matchesStatus =
        filters.status === 'all' || task.status === filters.status;

      const matchesPriority =
        filters.priority === 'all' || task.priority === filters.priority;

      const matchesAssignee =
        filters.assigneeId === 'all' ||
        task.assignee.id === filters.assigneeId;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPriority &&
        matchesAssignee
      );
    });
  });

  onFiltersChange(filters: TaskFilterI): void {
    this.filters.set(filters);
  }

  openTaskForm(): void {
    const dialogRef = this.dialog.open(TaskForm, {
      width: '600px',
      maxWidth: '95vw',
      autoFocus: 'first-tabbable',
    });

    dialogRef.componentRef?.setInput('assignees', this.assignees());

    console.log('11')
    dialogRef.componentInstance.save.subscribe((formValue) => {
      const assignee = this.assignees().find(
        (user) => user.id === formValue.assigneeId,
      );

      if (!assignee) {
        return;
      }

      console.log('22')

      this.tasksApi.createTask({
        ...formValue,
        assignee,
        tags: [],
      }).subscribe({
        next: () => {
          this.tasks.reload();
          dialogRef.close();
        },
        error: (error) => {
          console.error('Failed to create task:', error);
        },
      });
    });
  }

  openEditTaskForm(task: TaskI): void {
    const dialogRef = this.dialog.open(TaskForm, {
      width: '600px',
      maxWidth: '95vw',
      autoFocus: 'first-tabbable',
    });

    dialogRef.componentRef?.setInput('assignees', this.assignees());
    dialogRef.componentRef?.setInput('initialTask', task);

    dialogRef.componentInstance.save.subscribe((formValue) => {
      const assignee = this.assignees().find(
        (user) => user.id === formValue.assigneeId,
      );

      if (!assignee) {
        return;
      }

      this.tasksApi.updateTask(task.id, {
        ...formValue,
        assignee,
        tags: task.tags,
      }).subscribe({
        next: () => {
          this.tasks.reload();
          dialogRef.close();
        },
        error: (error) => {
          console.error('Failed to update task:', error);
        },
      });
    });
  }

  deleteTask(task: TaskI): void {
    const confirmed = confirm(
      `Are you sure you want to delete "${task.title}"?`,
    );

    if (!confirmed) {
      return;
    }

    this.tasksApi.deleteTask(task.id).subscribe({
      next: () => {
        this.tasks.reload();
      },
      error: (error) => {
        console.error('Failed to delete task:', error);
      },
    });
  }
}
