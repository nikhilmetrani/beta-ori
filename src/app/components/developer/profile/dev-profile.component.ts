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
import {Router, ActivatedRoute} from '@angular/router';
import {ProfileService, HttpErrorHandler} from '../../../core';
import {Observable} from 'rxjs/Observable';
import {Response} from '@angular/http';

@Component({
    selector: 'bo-dev-profile',
    templateUrl: './dev-profile.component.html'
})
export class DeveloperProfileComponent implements OnInit {

    observableDevProfile: (profile) => Observable<Response>;
    developerProfile: any = {rid: undefined,
        email: undefined,
        description: undefined,
        website: undefined,
        company: undefined,
        jobTitle: undefined,
        workPhone: undefined,
    };
    developerId: string = undefined;
    isProfileConfirmed: boolean = false;

    constructor(private profileService: ProfileService,
                private router: Router,
                private activatedRoute: ActivatedRoute,
                private errorHandler: HttpErrorHandler) {}

    ngOnInit() {
        this.developerId = localStorage.getItem('uid');
        this.activatedRoute.data.subscribe(data => {
            this.developerProfile = data['profile'];
            this.isProfileConfirmed = true;
        });
        // this.profile();
        // this.getProfile();
    }

    // getProfile() {
    //     this.observableDevProfile = () => {
    //         return this.profileService.getDeveloperProfile(this.developerId);
    //     };
    // }

    // profile() {
    //     this.observableDevProfile.
    //         .subscribe((profile) => {
    //                 this.developerProfile = profile;
    //             }, e => this.errorHandler.handle(e)
    //   )
    // ;
    // }

    onClickCreateProfile() {
        this.isProfileConfirmed = true;
    }

    onSubmitCreateProfile() {
        this.profileService.createDeveloperProfile(localStorage.getItem('uid'), this.developerProfile).subscribe(
            (response) => {
                if (response.status === 200) {
                // Success response, so lets go back to the developer home page.
                    this.router.navigate(['/']);
                }
            },
            () => { // Handle failure to create profile 
                }
        );
    }
}
