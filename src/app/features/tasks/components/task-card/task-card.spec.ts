
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskCard } from './task-card';
import { TaskI } from '../../../../core/models/task-i';

describe('TaskCard', () => {
  let component: TaskCard;
  let fixture: ComponentFixture<TaskCard>;

  const mockTask: TaskI = {
    id: 'task-001',
    title: 'Design dashboard',
    description: 'Create the dashboard layout',
    status: 'todo',
    priority: 'high',
    dueDate: '2026-12-01',
    assignee: {
      id: 'user-001',
      name: 'John Doe',
      avatar: 'JD',
      email: 'john.doe@company.com',
    },
    tags: ['Angular', 'Frontend'],
    createdAt: '2026-11-10T10:00:00.000Z',
    updatedAt: '2026-11-10T10:00:00.000Z',
    isOverdue: false,
    completedAt: '',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskCard],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskCard);
    fixture.componentRef.setInput('task', mockTask);
    fixture.detectChanges();

    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the task title and description', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('h3')?.textContent).toContain(
      mockTask.title,
    );
    expect(compiled.querySelector('.description')?.textContent).toContain(
      mockTask.description,
    );
  });

  it('should display the task priority', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const priority = compiled.querySelector('.priority');

    expect(priority?.textContent?.trim()).toBe('High');
    expect(priority?.classList.contains('high')).toBe(true);
  });

  it('should display task tags', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const tags = compiled.querySelectorAll('.tag');

    expect(tags.length).toBe(2);
    expect(tags[0].textContent).toContain('Angular');
    expect(tags[1].textContent).toContain('Frontend');
  });

  it('should display assignee information', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('.assignee')?.textContent).toContain(
      mockTask.assignee.name,
    );
    expect(compiled.querySelector('.assignee-avatar')?.textContent).toContain(
      mockTask.assignee.avatar,
    );
  });

  it('should emit the task when edit button is clicked', () => {
    const emitSpy = vi.spyOn(component.edit, 'emit');
    const editButton = fixture.nativeElement.querySelector(
      '[aria-label="Edit task"]',
    ) as HTMLButtonElement;

    editButton.click();

    expect(emitSpy).toHaveBeenCalledWith(mockTask);
  });

  it('should emit the task when delete button is clicked', () => {
    const emitSpy = vi.spyOn(component.delete, 'emit');
    const deleteButton = fixture.nativeElement.querySelector(
      '[aria-label="Delete task"]',
    ) as HTMLButtonElement;

    deleteButton.click();

    expect(emitSpy).toHaveBeenCalledWith(mockTask);
  });
});
