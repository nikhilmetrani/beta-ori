import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import {Injectable} from '@angular/core';
import {UserService} from './user.service';

@Injectable()
export class UserInfoResolver implements Resolve<any> {

  constructor(private userService: UserService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.userService.get('user');
  }

}
