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
import {ProfileService, DeveloperProfile, User, LoginService} from '../../core';

@Component({
    templateUrl: './developer.component.html',
    styleUrls: ['./developer.component.scss']
})
export class DeveloperComponent implements OnInit {

    developerProfile: DeveloperProfile = undefined;
    isProfileConfirmed: boolean = false;
    developerId: number;

    userName: string;
    isAuthenticated: boolean;

    constructor (private profileService: ProfileService,
                    private route: ActivatedRoute,
                    private loginService: LoginService,
                    private router: Router) {}

    ngOnInit() {
        this.developerId = +sessionStorage.getItem('uid');
        this.getProfile();
        this.fetchLoggedInUser();
    }

    createNewApplication() {
        // Navigate by URL to call parent route
        this.router.navigateByUrl('/developer/create-app');
    }

    getProfile() {
        this.profileService.getDeveloperProfile(this.developerId).subscribe(
            (profile: DeveloperProfile) => {
                this.developerProfile = profile;
                if (this.developerProfile !== undefined) {
                    if (this.developerProfile.email !== null &&
                        this.developerProfile.email !== undefined) {
                        this.isProfileConfirmed = true;
                    }
                }
            }
        );
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
