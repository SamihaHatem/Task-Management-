import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksPage } from './tasks-page';

describe('TasksPage', () => {
  let component: TasksPage;
  let fixture: ComponentFixture<TasksPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TasksPage],
    }).compileComponents();

    fixture = TestBed.createComponent(TasksPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should return all tasks when no filters are applied', () => {
    expect(component.filteredTasks()).toEqual(component.allTasks());
  });

  it('should update filters when onFiltersChange is called', () => {
    const filters = {
      search: 'dashboard',
      status: 'in_progress' as const,
      priority: 'high' as const,
      assigneeId: 'user-001',
    };

    component.onFiltersChange(filters);

    expect(component.filters()).toEqual(filters);
  });

  it('should filter tasks by title', () => {
    component.onFiltersChange({
      search: 'documentation',
      status: 'all',
      priority: 'all',
      assigneeId: 'all',
    });

    expect(component.filteredTasks().length).toBeGreaterThan(0);

    expect(
      component.filteredTasks().every((task) =>
        task.title.toLowerCase().includes('documentation') ||
        task.description.toLowerCase().includes('documentation')
      )
    ).toBe(true);
  });
  it('should filter tasks by status', () => {
    component.onFiltersChange({
      search: '',
      status: 'in_progress',
      priority: 'all',
      assigneeId: 'all',
    });

    expect(component.filteredTasks().length).toBeGreaterThan(0);

    expect(
      component.filteredTasks().every(
        (task) => task.status === 'in_progress',
      ),
    ).toBe(true);
  });

  it('should filter tasks by priority', () => {
    component.onFiltersChange({
      search: '',
      status: 'all',
      priority: 'high',
      assigneeId: 'all',
    });

    expect(
      component.filteredTasks().every(
        (task) => task.priority === 'high',
      ),
    ).toBe(true);
  });
});
