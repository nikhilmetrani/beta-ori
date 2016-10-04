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

import { Component, OnInit } from '@angular/core';

import {LoginService, User} from './core';

import '../style/app.scss';

import 'jquery';

@Component({
  selector: 'bo-app', // <bo-app></bo-app>
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  userName: string;
  isAuthenticated: boolean;

  constructor(private loginService: LoginService) {}

  ngOnInit() {
        this.fetchLoggedInUser();
    }

    fetchLoggedInUser() {
        this.loginService.getUserDetails().subscribe(
            (user: User) => {
                this.validateUser(user);
            },
            (err: any) => {
                // User is not logged in!
                this.invalidateUser(); 
            }
        );
    }

    logout() {
        this.loginService.logout().subscribe(
            response => this.invalidateUser()
        );
    }

    validateUser(user: User) {
        if (user !== undefined) {
            this.userName = user.name;
            sessionStorage.setItem('uid', user.rid.toString());
            this.isAuthenticated = true;
        }
    }

    invalidateUser() {
        this.userName = undefined;
        sessionStorage.removeItem('uid');
        this.isAuthenticated = false;
    }
}
