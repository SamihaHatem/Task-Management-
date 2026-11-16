
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StatisticsCards } from './statistics-cards';
import { StatisticI } from '../../../../core/models/statistic-i';

describe('StatisticsCards', () => {
  let component: StatisticsCards;
  let fixture: ComponentFixture<StatisticsCards>;

  const mockStatistics: StatisticI[] = [
    {
      id: 'stat-001',
      title: 'Total Tasks',
      icon: '📋',
      value: 156,
      change: '+12%',
      changeLabel: 'vs last month',
      changeType: 'positive',
      color: '#3B82F6',
    },
    {
      id: 'stat-002',
      title: 'Completed',
      icon: '✓',
      value: 89,
      change: '-5%',
      changeLabel: 'vs last month',
      changeType: 'negative',
      color: '#10B981',
    },
    {
      id: 'stat-003',
      title: 'In Progress',
      icon: '⏳',
      value: 42,
      change: '0%',
      changeLabel: 'no change',
      changeType: 'neutral',
      color: '#F59E0B',
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatisticsCards],
    }).compileComponents();

    fixture = TestBed.createComponent(StatisticsCards);
    fixture.componentRef.setInput('statistics', mockStatistics);
    fixture.detectChanges();

    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all statistics cards', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelectorAll('.stat-card').length).toBe(3);
  });

  it('should display statistic titles and values', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain('Total Tasks');
    expect(compiled.textContent).toContain('Completed');
    expect(compiled.textContent).toContain('In Progress');

    const values = compiled.querySelectorAll('.stat-value');

    expect(values[0].textContent?.trim()).toBe('156');
    expect(values[1].textContent?.trim()).toBe('89');
    expect(values[2].textContent?.trim()).toBe('42');
  });

  it('should display change information', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain('+12%');
    expect(compiled.textContent).toContain('-5%');
    expect(compiled.textContent).toContain('0%');
    expect(compiled.textContent).toContain('vs last month');
  });

  it('should apply the correct class for each change type', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('.change.positive')).toBeTruthy();
    expect(compiled.querySelector('.change.negative')).toBeTruthy();
    expect(compiled.querySelector('.change.neutral')).toBeTruthy();
  });

  it('should display the statistic icons and colors', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const icons = compiled.querySelectorAll('.stat-icon');

    expect(icons[0].textContent).toContain('📋');
    expect((icons[0] as HTMLElement).style.backgroundColor).toBe(
      'rgb(59, 130, 246)',
    );
  });

  it('should render no cards when statistics are empty', () => {
    fixture.componentRef.setInput('statistics', []);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelectorAll('.stat-card').length).toBe(0);
  });
});
