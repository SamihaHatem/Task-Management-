import { Component, input } from '@angular/core';
import { RecentActivityI } from '../../../../core/models/recent-activity-i';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-recent-activity',
  imports: [DatePipe],
  templateUrl: './recent-activity.html',
  styleUrl: './recent-activity.scss',
})
export class RecentActivity {
    readonly activities = input.required<RecentActivityI[]>();

}
