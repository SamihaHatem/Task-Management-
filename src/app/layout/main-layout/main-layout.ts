import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Sidebar } from '../sidebar/sidebar';
import { RouterOutlet } from '@angular/router';
import { Header } from '../header/header';
import { MatSidenavModule } from '@angular/material/sidenav';

import { BreakpointObserver } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, MatSidenavModule, Sidebar, Header],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayout {
  private readonly breakpointObserver = inject(BreakpointObserver);

  readonly isMobile = toSignal(
    this.breakpointObserver.observe('(max-width: 768px)').pipe(map(({ matches }) => matches)),
    { initialValue: false },
  );

  readonly isSidenavOpen = signal(false);

  toggleSidenav(): void {
    this.isSidenavOpen.update((isOpen) => {
      const newValue = !isOpen;
      console.log('Sidenav state:', newValue);
      return newValue;
    });
  }

  closeSidenavOnMobile(): void {
    if (this.isMobile()) {
      this.isSidenavOpen.set(false);
    }
  }
}
