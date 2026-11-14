import { Component, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-tasks-header',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './tasks-header.html',
  styleUrl: './tasks-header.scss',
})
export class TasksHeader {
  readonly createTask = output<void>();

}
