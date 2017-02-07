import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {LoginService} from '../services/login.service';

@Injectable()
export class PublicPageGuard implements CanActivate {

  constructor(private router: Router, private loginService: LoginService) {
  }

  canActivate() {
    if (this.loginService.isSignedIn()) {
      this.router.navigate(['/']);
    }
    return !this.loginService.isSignedIn();
  }

}
