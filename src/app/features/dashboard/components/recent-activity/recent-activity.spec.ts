import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecentActivity } from './recent-activity';
import { RecentActivityI } from '../../../../core/models/recent-activity-i';

describe('RecentActivity', () => {
  let component: RecentActivity;
  let fixture: ComponentFixture<RecentActivity>;

  const mockActivities: RecentActivityI[] = [
    {
      id: 'activity-001',
      taskTitle: 'Design dashboard',
      action: 'created',
      timestamp: '2026-11-15T10:00:00.000Z',
    },
    {
      id: 'activity-002',
      taskTitle: 'Implement filters',
      action: 'updated',
      timestamp: '2026-11-15T11:00:00.000Z',
    },
    {
      id: 'activity-003',
      taskTitle: 'Build task board',
      action: 'completed',
      timestamp: '2026-11-15T12:00:00.000Z',
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecentActivity],
    }).compileComponents();

    fixture = TestBed.createComponent(RecentActivity);
    fixture.componentRef.setInput('activities', mockActivities);
    fixture.detectChanges();

    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the activity section heading', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('h2')?.textContent).toContain('Recent Activity');
  });

  it('should render all activities', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const activities = compiled.querySelectorAll('.activity-item');

    expect(activities.length).toBe(3);
  });

  it('should display task titles and activity actions', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const content = compiled.querySelector('.activity-list')?.textContent;

    expect(content).toContain('Design dashboard');
    expect(content).toContain('was created');
    expect(content).toContain('Implement filters');
    expect(content).toContain('was updated');
    expect(content).toContain('Build task board');
    expect(content).toContain('was completed');
  });

  it('should apply the correct class for each activity action', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('.activity-icon.created')).toBeTruthy();
    expect(compiled.querySelector('.activity-icon.updated')).toBeTruthy();
    expect(compiled.querySelector('.activity-icon.completed')).toBeTruthy();
  });

  it('should display the empty state when there are no activities', () => {
    fixture.componentRef.setInput('activities', []);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('.empty-state')?.textContent).toContain(
      'No recent activity yet.',
    );
    expect(compiled.querySelectorAll('.activity-item').length).toBe(0);
  });
});
