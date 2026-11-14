import { httpResource } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AssigneeI } from '../../models/assignee-i';

@Injectable({
  providedIn: 'root',
})
export class UsersServices {
  private readonly apiUrl = 'http://localhost:3000/users';

  readonly usersResource = httpResource<AssigneeI[]>(() => this.apiUrl);
}
