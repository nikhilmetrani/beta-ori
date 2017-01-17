import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LoginService, UserService} from '../../../core';

@Component({
  selector: 'bo-store-navbar',
  templateUrl: 'store-navbar.component.html'
})
export class StoreNavbarComponent implements OnInit {

  userName: string;
  isSignedIn: boolean;

  constructor(private router: Router,
              private loginService: LoginService,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.isSignedIn = this.loginService.isSignedIn();
    this.loginService.events.subscribe(() => {
      this.isSignedIn = this.loginService.isSignedIn();
    });
    if (this.isSignedIn) { // We are now logged in. Let's get the user name.
      this.userService.get('user').subscribe((user) => {
        this.userName = user.username;
      });
    }
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

}
