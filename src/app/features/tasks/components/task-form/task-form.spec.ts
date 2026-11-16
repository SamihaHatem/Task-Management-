
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskForm } from './task-form';
import { TaskI } from '../../../../core/models/task-i';

describe('TaskForm', () => {
  let component: TaskForm;
  let fixture: ComponentFixture<TaskForm>;

  const mockTask: TaskI = {
    id: 'task-001',
    title: 'Existing task',
    description: 'Existing description',
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
    createdAt: '2026-11-10T10:00:00.000Z',
    updatedAt: '2026-11-10T10:00:00.000Z',
    isOverdue: false,
    completedAt: '',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskForm],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskForm);
    fixture.componentRef.setInput('assignees', []);
    fixture.detectChanges();

    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form as invalid', () => {
    expect(component.taskForm.invalid).toBe(true);
  });

  it('should require title and description', () => {
    expect(component.taskForm.controls.title.hasError('required')).toBe(true);
    expect(component.taskForm.controls.description.hasError('required')).toBe(true);
  });

  it('should reject title and description containing only whitespace', () => {
    const { title, description } = component.taskForm.controls;

    title.setValue('   ');
    description.setValue('   ');

    expect(title.hasError('whitespace')).toBe(true);
    expect(description.hasError('whitespace')).toBe(true);
  });

  it('should reject title longer than 100 characters', () => {
    const title = component.taskForm.controls.title;

    title.setValue('a'.repeat(101));

    expect(title.hasError('maxlength')).toBe(true);
  });

  it('should reject description longer than 500 characters', () => {
    const description = component.taskForm.controls.description;

    description.setValue('a'.repeat(501));

    expect(description.hasError('maxlength')).toBe(true);
  });

  it('should mark all controls as touched when submitting an invalid form', () => {
    const emitSpy = vi.spyOn(component.save, 'emit');

    component.onSubmit();

    expect(component.taskForm.touched).toBe(true);
    expect(emitSpy).not.toHaveBeenCalled();
  });

  it('should emit form values when submitting a valid form', () => {
    const emitSpy = vi.spyOn(component.save, 'emit');

    const formValues = {
      title: 'Implement dashboard',
      description: 'Build the task dashboard page',
      priority: 'high' as const,
      status: 'in_progress' as const,
      dueDate: '2026-12-01',
      assigneeId: 'user-001',
    };

    component.taskForm.setValue(formValues);

    component.onSubmit();

    expect(emitSpy).toHaveBeenCalledWith(formValues);
  });

  it('should populate the form when editing an existing task', () => {
    fixture = TestBed.createComponent(TaskForm);
    fixture.componentRef.setInput('assignees', []);
    fixture.componentRef.setInput('initialTask', mockTask);
    fixture.detectChanges();

    component = fixture.componentInstance;

    expect(component.taskForm.getRawValue()).toEqual({
      title: mockTask.title,
      description: mockTask.description,
      priority: mockTask.priority,
      status: mockTask.status,
      dueDate: mockTask.dueDate,
      assigneeId: mockTask.assignee.id,
    });
  });

  it('should keep the form valid when editing a valid existing task', () => {
    fixture = TestBed.createComponent(TaskForm);
    fixture.componentRef.setInput('assignees', []);
    fixture.componentRef.setInput('initialTask', mockTask);
    fixture.detectChanges();

    component = fixture.componentInstance;

    expect(component.taskForm.valid).toBe(true);
  });
});
