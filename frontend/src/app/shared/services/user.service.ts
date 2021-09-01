import { Injectable } from '@angular/core';

@Injectable()
export class UserService {
  /**
   * The functions of this class could be moved to Auth service
   */
  public users: {id: string, password: string}[] = [];

  getUsers() {
    return this.users;
  }

  addUser(user: {id: string, password: string}) {
    this.users.push(user);
  }

  findUser(searchId, searchPass): boolean {
    const res = this.users.find(user =>
      (user.id === searchId && user.password === searchPass));
    return res ? true: false;
  }
}
