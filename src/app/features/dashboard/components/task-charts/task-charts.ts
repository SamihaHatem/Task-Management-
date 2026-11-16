import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { TaskI } from '../../../../core/models/task-i';
import { ChartData, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-task-charts',
  imports: [BaseChartDirective],
  templateUrl: './task-charts.html',
  styleUrl: './task-charts.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskCharts {
  readonly tasks = input.required<TaskI[]>();

  readonly statusChartData = computed<ChartData<'doughnut'>>(() => {
    const tasks = this.tasks();

    return {
      labels: ['To Do', 'In Progress', 'Done'],
      datasets: [
        {
          data: [
            tasks.filter((task) => task.status === 'todo').length,
            tasks.filter((task) => task.status === 'in_progress').length,
            tasks.filter((task) => task.status === 'done').length,
          ],
          backgroundColor: ['#F59E0B', '#3B82F6', '#10B981'],
          borderWidth: 0,
        },
      ],
    };
  });

  readonly priorityChartData = computed<ChartData<'bar'>>(() => {
    const tasks = this.tasks();

    return {
      labels: ['High', 'Medium', 'Low'],
      datasets: [
        {
          label: 'Tasks',
          data: [
            tasks.filter((task) => task.priority === 'high').length,
            tasks.filter((task) => task.priority === 'medium').length,
            tasks.filter((task) => task.priority === 'low').length,
          ],
          backgroundColor: ['#EF4444', '#F59E0B', '#10B981'],
          borderRadius: 6,
        },
      ],
    };
  });

  readonly statusChartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };

  readonly priorityChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
        },
      },
    },
  };
}
