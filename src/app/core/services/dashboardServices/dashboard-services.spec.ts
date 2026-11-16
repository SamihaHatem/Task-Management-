
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { DashboardServices } from './dashboard-services';

describe('DashboardServices', () => {
  let service: DashboardServices;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DashboardServices,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(DashboardServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should expose the statistics resource', () => {
    expect(service.statisticsResource).toBeTruthy();
    expect(typeof service.statisticsResource.reload).toBe('function');
  });
});
