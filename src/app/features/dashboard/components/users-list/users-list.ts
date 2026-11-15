import {
  ChangeDetectionStrategy,
  Component,
  inject,
} from '@angular/core';
import { UsersServices } from '../../../../core/services/usersServices/users-services';

@Component({
  selector: 'app-users-list',
  imports: [],
  templateUrl: './users-list.html',
  styleUrl: './users-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersList {
  private readonly usersApi = inject(UsersServices);

  readonly users = this.usersApi.usersResource;
}

