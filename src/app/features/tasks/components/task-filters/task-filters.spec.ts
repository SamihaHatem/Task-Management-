
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskFilters } from './task-filters';

describe('TaskFilters', () => {
  let component: TaskFilters;
  let fixture: ComponentFixture<TaskFilters>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskFilters],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskFilters);
    fixture.componentRef.setInput('assignees', []);
    fixture.detectChanges();

    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize filters with default values', () => {
    expect(component.filtersForm.getRawValue()).toEqual({
      search: '',
      status: 'all',
      priority: 'all',
      assigneeId: 'all',
    });
  });

  it('should emit filters when search value changes', () => {
    const emitSpy = vi.spyOn(component.filtersChange, 'emit');

    component.filtersForm.controls.search.setValue('dashboard');

    expect(emitSpy).toHaveBeenCalledWith({
      search: 'dashboard',
      status: 'all',
      priority: 'all',
      assigneeId: 'all',
    });
  });

  it('should emit filters when status changes', () => {
    const emitSpy = vi.spyOn(component.filtersChange, 'emit');

    component.filtersForm.controls.status.setValue('in_progress');

    expect(emitSpy).toHaveBeenCalledWith({
      search: '',
      status: 'in_progress',
      priority: 'all',
      assigneeId: 'all',
    });
  });

  it('should emit filters when priority changes', () => {
    const emitSpy = vi.spyOn(component.filtersChange, 'emit');

    component.filtersForm.controls.priority.setValue('high');

    expect(emitSpy).toHaveBeenCalledWith({
      search: '',
      status: 'all',
      priority: 'high',
      assigneeId: 'all',
    });
  });

  it('should emit filters when assignee changes', () => {
    const emitSpy = vi.spyOn(component.filtersChange, 'emit');

    component.filtersForm.controls.assigneeId.setValue('user-001');

    expect(emitSpy).toHaveBeenCalledWith({
      search: '',
      status: 'all',
      priority: 'all',
      assigneeId: 'user-001',
    });
  });
});
