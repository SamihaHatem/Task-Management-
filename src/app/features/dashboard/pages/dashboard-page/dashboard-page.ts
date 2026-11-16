import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { DashboardServices } from '../../../../core/services/dashboardServices/dashboard-services';
import { StatisticsCards } from '../../components/statistics-cards/statistics-cards';
import { TasksServices } from '../../../../core/services/tasksServices/tasks-services';
import { TaskCharts } from '../../components/task-charts/task-charts';
import { RecentActivity } from '../../components/recent-activity/recent-activity';
import { RecentActivityI } from '../../../../core/models/recent-activity-i';
import { UsersList } from '../../components/users-list/users-list';

@Component({
  selector: 'app-dashboard-page',
  imports: [StatisticsCards, TaskCharts, RecentActivity, UsersList],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPage {
  private readonly dashboardApi = inject(DashboardServices);

  readonly statistics = this.dashboardApi.statisticsResource;
  private readonly tasksApi = inject(TasksServices);

  readonly tasks = this.tasksApi.tasksResource;

  readonly recentActivities = computed<RecentActivityI[]>(() => {
    const tasks = this.tasks.value() ?? [];

    return tasks
      .flatMap((task) => {
        const activities: RecentActivityI[] = [
          {
            id: `${task.id}-created`,
            taskTitle: task.title,
            action: 'created',
            timestamp: task.createdAt,
          },
        ];

        if (task.updatedAt !== task.createdAt) {
          activities.push({
            id: `${task.id}-updated`,
            taskTitle: task.title,
            action: 'updated',
            timestamp: task.updatedAt,
          });
        }

        if (task.completedAt) {
          activities.push({
            id: `${task.id}-completed`,
            taskTitle: task.title,
            action: 'completed',
            timestamp: task.completedAt,
          });
        }

        return activities;
      })
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 5);
  });
}
