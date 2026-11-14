import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskCharts } from './task-charts';

describe('TaskCharts', () => {
  let component: TaskCharts;
  let fixture: ComponentFixture<TaskCharts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskCharts],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskCharts);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
