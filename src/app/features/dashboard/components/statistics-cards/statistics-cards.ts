import { Component, input } from '@angular/core';
import { StatisticI } from '../../../../core/models/statistic-i';

@Component({
  selector: 'app-statistics-cards',
  imports: [],
  templateUrl: './statistics-cards.html',
  styleUrl: './statistics-cards.scss',
})
export class StatisticsCards {
  readonly statistics = input.required<StatisticI[]>();

}
