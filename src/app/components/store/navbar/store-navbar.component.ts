/**
* Copyright 2016 - 29cu.io and the authors of beta-ori open source project

* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at

*     http://www.apache.org/licenses/LICENSE-2.0

* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
**/

import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LoginService, UserService} from '../../../core';

interface Authority {
  authority: string;
}

@Component({
  selector: 'bo-store-navbar',
  templateUrl: 'store-navbar.component.html'
})
export class StoreNavbarComponent implements OnInit {

  userName: string;
  isSignedIn: boolean;
  isEmployee: boolean = false;

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
        user.authorities.forEach(auth => {
          if (auth.authority === 'ROLE_MAINTAINER' || auth.authority === 'ROLE_MANAGER') {
              this.isEmployee = true;
          }
        });
        //console.log(user.authorities);
      });
    }
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

}
