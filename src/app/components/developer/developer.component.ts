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
import {ActivatedRoute} from '@angular/router';
import {ProfileService, DeveloperProfile} from '../../core';

@Component({
    templateUrl: './developer.component.html',
    styleUrls: ['./developer.component.scss']
})
export class DeveloperComponent implements OnInit {

    developerProfile: DeveloperProfile = undefined;
    isProfileConfirmed: boolean = false;
    developerId: number;

    constructor (private profileService: ProfileService, private route: ActivatedRoute) {}

    ngOnInit() {
        this.developerId = +sessionStorage.getItem('uid');
        this.getProfile();
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
}
