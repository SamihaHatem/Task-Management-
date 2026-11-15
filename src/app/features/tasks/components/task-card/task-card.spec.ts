import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskCard } from './task-card';

describe('TaskCard', () => {
  let component: TaskCard;
  let fixture: ComponentFixture<TaskCard>;

  beforeEach(async () => {
  await TestBed.configureTestingModule({
    imports: [TaskCard],
  }).compileComponents();

  fixture = TestBed.createComponent(TaskCard);

  fixture.componentRef.setInput('task', {
    id: 'task-001',
    title: 'Test task',
    description: 'Test description',
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
    createdAt: '2026-11-16T10:00:00.000Z',
    updatedAt: '2026-11-16T10:00:00.000Z',
    isOverdue: false,
    completedAt: '',
  });

  fixture.detectChanges();

  component = fixture.componentInstance;
  await fixture.whenStable();
});

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
