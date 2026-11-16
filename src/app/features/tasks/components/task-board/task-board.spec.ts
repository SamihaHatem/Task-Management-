
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskBoard } from './task-board';
import { TaskI } from '../../../../core/models/task-i';

describe('TaskBoard', () => {
  let component: TaskBoard;
  let fixture: ComponentFixture<TaskBoard>;

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
      imports: [TaskBoard],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskBoard);
    fixture.componentRef.setInput('tasks', []);
    fixture.detectChanges();

    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain three columns', () => {
    expect(component.columns()).toHaveLength(3);
  });

  it('should group todo tasks in the To Do column', () => {
    fixture.componentRef.setInput('tasks', mockTasks);

    expect(
      component.columns().find((column) => column.status === 'todo')?.tasks,
    ).toEqual([mockTasks[0]]);
  });

  it('should group in-progress tasks in the In Progress column', () => {
    fixture.componentRef.setInput('tasks', mockTasks);

    expect(
      component.columns().find((column) => column.status === 'in_progress')?.tasks,
    ).toEqual([mockTasks[1]]);
  });

  it('should group completed tasks in the Done column', () => {
    fixture.componentRef.setInput('tasks', mockTasks);

    expect(
      component.columns().find((column) => column.status === 'done')?.tasks,
    ).toEqual([mockTasks[2]]);
  });
});
