import { Component, input, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-header',
  imports: [MatIconModule, MatButtonModule, MatBadgeModule, MatMenuModule, MatFormFieldModule, MatInputModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  readonly isMobile = input(false);
  readonly menuClick = output<void>();
}
