
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { UsersList } from './users-list';
import { UsersServices } from '../../../../core/services/usersServices/users-services';
import { AssigneeI } from '../../../../core/models/assignee-i';

describe('UsersList', () => {
  let component: UsersList;
  let fixture: ComponentFixture<UsersList>;

  const mockUsers: AssigneeI[] = [
    {
      id: 'user-001',
      name: 'John Doe',
      avatar: 'JD',
      email: 'john.doe@company.com',
    },
    {
      id: 'user-002',
      name: 'Sarah Smith',
      avatar: 'SS',
      email: 'sarah.smith@company.com',
    },
  ];

  const usersResourceMock = {
    value: signal<AssigneeI[] | undefined>(mockUsers),
    isLoading: signal(false),
    error: signal<unknown | undefined>(undefined),
    reload: vi.fn(),
  };

  beforeEach(async () => {
    usersResourceMock.value.set(mockUsers);
    usersResourceMock.isLoading.set(false);
    usersResourceMock.error.set(undefined);
    usersResourceMock.reload.mockClear();

    await TestBed.configureTestingModule({
      imports: [UsersList],
      providers: [
        {
          provide: UsersServices,
          useValue: {
            usersResource: usersResourceMock,
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersList);
    fixture.detectChanges();

    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display all users', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelectorAll('.user-card').length).toBe(2);
    expect(compiled.textContent).toContain('John Doe');
    expect(compiled.textContent).toContain('Sarah Smith');
  });

  it('should display the correct members count', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain('2 Members');
  });

  it('should display loading state', () => {
    usersResourceMock.isLoading.set(true);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain('Loading team members...');
  });


});
