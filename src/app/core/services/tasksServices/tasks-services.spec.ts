import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { TasksServices } from './tasks-services';
import { TaskI } from '../../models/task-i';

describe('TasksServices', () => {
  let service: TasksServices;
  let httpMock: HttpTestingController;

  const apiUrl = 'http://localhost:3000/tasks';

  const taskPayload: Omit<TaskI, 'id' | 'createdAt' | 'updatedAt' | 'isOverdue' | 'completedAt'> = {
    title: 'Implement dashboard',
    description: 'Build the dashboard page',
    status: 'in_progress',
    priority: 'high',
    dueDate: '2026-12-01',
    assignee: {
      id: 'user-001',
      name: 'John Doe',
      avatar: 'JD',
      email: 'john.doe@company.com',
    },
    tags: [],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TasksServices, provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(TasksServices);
    httpMock = TestBed.inject(HttpTestingController);

    // Flush the initial httpResource GET request, if triggered.
    const initialRequests = httpMock.match({
      method: 'GET',
      url: apiUrl,
    });

    initialRequests.forEach((request) => request.flush([]));
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a task using POST', () => {
    service.createTask(taskPayload).subscribe((task) => {
      expect(task.title).toBe(taskPayload.title);
      expect(task.id).toBeTruthy();
      expect(task.createdAt).toBeTruthy();
      expect(task.updatedAt).toBe(task.createdAt);
      expect(task.isOverdue).toBe(false);
      expect(task.completedAt).toBe('');
    });

    const request = httpMock.expectOne(apiUrl);

    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual(
      expect.objectContaining({
        ...taskPayload,
        id: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        isOverdue: false,
        completedAt: '',
      }),
    );

    request.flush({
      ...request.request.body,
    });
  });

  it('should update a task using PATCH', () => {
    const taskId = 'task-001';

    service.updateTask(taskId, taskPayload).subscribe((task) => {
      expect(task.title).toBe(taskPayload.title);
    });

    const request = httpMock.expectOne(`${apiUrl}/${taskId}`);

    expect(request.request.method).toBe('PATCH');
    expect(request.request.body).toEqual(
      expect.objectContaining({
        ...taskPayload,
        updatedAt: expect.any(String),
      }),
    );

    request.flush({
      id: taskId,
      ...request.request.body,
    });
  });

  it('should delete a task using DELETE', () => {
    const taskId = 'task-001';

    service.deleteTask(taskId).subscribe();

    const request = httpMock.expectOne(`${apiUrl}/${taskId}`);

    expect(request.request.method).toBe('DELETE');

    request.flush(null);
  });
});
