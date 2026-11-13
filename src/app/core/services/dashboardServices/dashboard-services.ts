import { httpResource } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StatisticI } from '../../models/statistic-i';

@Injectable({
  providedIn: 'root',
})
export class DashboardServices {
  private readonly apiUrl = 'http://localhost:3000/statistics';

  readonly statisticsResource = httpResource<StatisticI[]>(
    () => this.apiUrl
  );
}
