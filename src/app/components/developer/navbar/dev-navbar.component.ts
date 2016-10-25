import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from '../../../core';

@Component({
  selector: 'bo-dev-navbar',
  templateUrl: 'dev-navbar.component.html'
})
export class DeveloperNavbarComponent implements OnInit {

  isSignedIn: boolean;

  constructor(private router: Router,
              private loginService: LoginService) {
  }

  ngOnInit(): void {
    this.isSignedIn = this.loginService.isSignedIn();
    this.loginService.events.subscribe(() => {
      this.isSignedIn = this.loginService.isSignedIn();
    });
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

}
