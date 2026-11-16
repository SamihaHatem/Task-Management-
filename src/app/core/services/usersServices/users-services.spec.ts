import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { UsersServices } from './users-services';

describe('UsersServices', () => {
  let service: UsersServices;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsersServices, provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(UsersServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should expose the users resource', () => {
    expect(service.usersResource).toBeTruthy();
    expect(typeof service.usersResource.reload).toBe('function');
  });
});
