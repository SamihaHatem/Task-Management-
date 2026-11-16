import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskCharts } from './task-charts';
import { TaskI } from '../../../../core/models/task-i';

describe('TaskCharts', () => {
  let component: TaskCharts;
  let fixture: ComponentFixture<TaskCharts>;

  const mockTasks: TaskI[] = [
    {
      id: 'task-001',
      title: 'Todo task',
      description: 'Task to do',
      status: 'todo',
      priority: 'high',
      dueDate: '2026-12-01',
      assignee: {
        id: 'user-001',
        name: 'John Doe',
        avatar: 'JD',
        email: 'john.doe@company.com',
      },
      tags: [],
      createdAt: '2026-11-10T10:00:00.000Z',
      updatedAt: '2026-11-10T10:00:00.000Z',
      isOverdue: false,
      completedAt: '',
    },
    {
      id: 'task-002',
      title: 'In progress task',
      description: 'Task in progress',
      status: 'in_progress',
      priority: 'medium',
      dueDate: '2026-12-02',
      assignee: {
        id: 'user-002',
        name: 'Sarah Smith',
        avatar: 'SS',
        email: 'sarah.smith@company.com',
      },
      tags: [],
      createdAt: '2026-11-10T10:00:00.000Z',
      updatedAt: '2026-11-10T10:00:00.000Z',
      isOverdue: false,
      completedAt: '',
    },
    {
      id: 'task-003',
      title: 'Done task',
      description: 'Completed task',
      status: 'done',
      priority: 'low',
      dueDate: '2026-12-03',
      assignee: {
        id: 'user-003',
        name: 'Mike Johnson',
        avatar: 'MJ',
        email: 'mike.johnson@company.com',
      },
      tags: [],
      createdAt: '2026-11-10T10:00:00.000Z',
      updatedAt: '2026-11-10T10:00:00.000Z',
      isOverdue: false,
      completedAt: '2026-11-11T10:00:00.000Z',
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskCharts],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskCharts);
    fixture.componentRef.setInput('tasks', []);
    fixture.detectChanges();

    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize status chart with zero counts', () => {
    expect(component.statusChartData().datasets[0].data).toEqual([0, 0, 0]);
  });

  it('should calculate task counts for each status', () => {
    fixture.componentRef.setInput('tasks', mockTasks);

    expect(component.statusChartData().labels).toEqual(['To Do', 'In Progress', 'Done']);
    expect(component.statusChartData().datasets[0].data).toEqual([1, 1, 1]);
  });

  it('should calculate task counts for each priority', () => {
    fixture.componentRef.setInput('tasks', mockTasks);

    expect(component.priorityChartData().labels).toEqual(['High', 'Medium', 'Low']);
    expect(component.priorityChartData().datasets[0].data).toEqual([1, 1, 1]);
  });

  it('should update chart data when tasks change', () => {
    fixture.componentRef.setInput('tasks', mockTasks);

    expect(component.statusChartData().datasets[0].data).toEqual([1, 1, 1]);

    fixture.componentRef.setInput('tasks', [mockTasks[0]]);

    expect(component.statusChartData().datasets[0].data).toEqual([1, 0, 0]);
    expect(component.priorityChartData().datasets[0].data).toEqual([1, 0, 0]);
  });
});
