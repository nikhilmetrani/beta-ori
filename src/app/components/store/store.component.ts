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
import {ActivatedRoute, Router} from '@angular/router';
import {LoginService, UserService} from '../../core';

@Component({
    templateUrl: './store.component.html'
})
export class StoreComponent implements OnInit {

    developerId: number;
    userName: string;
    isAuthenticated: boolean;
    isRunningInClient: boolean = false;
    isSignedIn: boolean;

    constructor (private route: ActivatedRoute,
                    private loginService: LoginService,
                    private userService: UserService,
                    private router: Router) {}

    ngOnInit() {
        this.isSignedIn = this.loginService.isSignedIn();
        this.loginService.events.subscribe(() => {
            this.isSignedIn = this.loginService.isSignedIn();
            if (this.isSignedIn) { // We are now logged in. Let's get the user name.
                this.userService.get('user').subscribe((user) => this.userName = user.username);
            }
        });
        this.route.queryParams.subscribe(params => {
            let queryParams = params['client'];
            this.isRunningInClient = queryParams === 'copper';
            if (this.isRunningInClient) {
                localStorage.setItem('client', 'copper');
            }
        });
    }

    logout() {
        this.loginService.logout();
        this.router.navigate(['/login']);
    }
}
