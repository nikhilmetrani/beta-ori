import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
// import * as toastr from 'toastr';
import {LoginService} from './login.service';

@Injectable()
export class HttpErrorHandler {

  constructor(private router: Router,
              private loginService: LoginService) {
  }

  handle(error: any) {
    switch (error.status)
    {
      case 500:
      case 401:
        this.loginService.logout();
        this.router.navigate(['login']);
        break;
    }
  }

}
