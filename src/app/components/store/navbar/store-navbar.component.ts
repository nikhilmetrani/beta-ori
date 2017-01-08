import {Component, OnInit, Input} from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from '../../../core';

@Component({
  selector: 'bo-store-navbar',
  templateUrl: 'store-navbar.component.html'
})
export class StoreNavbarComponent implements OnInit {

  @Input() userName: string;
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
