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

import {Component, Input, OnInit} from "@angular/core";
import {ActivatedRoute} from '@angular/router';
import {ProfileService, DeveloperProfile} from "../../../../core/exports";

@Component({
    selector: 'developer-welcome',
    templateUrl: './app/components/developer/profile/welcome/welcome.html'//,
    // styleUrls: ['./app/components/developer/profile/welcome/welcome.css']
})
export class DeveloperWelcomeComponent implements OnInit {

    developerId: number;
    developerProfile: DeveloperProfile;

    constructor (private profileService: ProfileService) {}

    ngOnInit() {
        this.developerId = +sessionStorage.getItem("uid");
    }
}

