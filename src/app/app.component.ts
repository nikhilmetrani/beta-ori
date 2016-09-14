/**
* Copyright 2016 - 29cu.io and the authors of alpha-umi open source project

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

import {Component, OnInit} from "@angular/core";
import {LoginService} from "./login/login.service";

@Component({
    selector: "app",
    templateUrl: "./app/app.html"
})
export class AppComponent implements OnInit {
    userName: string;
    isAuthenticated: boolean;

    constructor(private loginService: LoginService) {}

    ngOnInit() {
        console.log("Application component initialized ...");
        this.tryLogin();
    }

    tryLogin() {
        this.loginService.login().subscribe(
            user => {
                this.validateUser(user.name);
            }
        );
    }

    logout() {
        this.loginService.logout();
        this.invalidateUser();
    }

    validateUser(userName: string) {
        if (userName !== "N/A") {
            this.userName = userName;
            this.isAuthenticated = true;
        }
    }

    invalidateUser() {
        this.userName = "N/A";
        this.isAuthenticated = false;
    }
}