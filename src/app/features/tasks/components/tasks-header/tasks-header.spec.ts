import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksHeader } from './tasks-header';

describe('TasksHeader', () => {
  let component: TasksHeader;
  let fixture: ComponentFixture<TasksHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TasksHeader],
    }).compileComponents();

    fixture = TestBed.createComponent(TasksHeader);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
