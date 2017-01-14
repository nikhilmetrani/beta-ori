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

@Component({
    selector: 'bo-consumer-profile',
    templateUrl: './consumer-profile.component.html'
})
export class ConsumerProfileComponent implements OnInit {

    observableConsumerProfile: Observable<any>;
    consumerProfile: any = {id: undefined,
        email: undefined,
        website: undefined,
    };
    consumerId: string = undefined;
    isProfileConfirmed: boolean = false;

    constructor(private profileService: ProfileService,
                private router: Router,
                private activatedRoute: ActivatedRoute,
                private errorHandler: HttpErrorHandler) {}

    ngOnInit() {
        this.consumerId = localStorage.getItem('uid');
        this.activatedRoute.data.subscribe(data => {
            this.consumerProfile = data['profile'].json();
            this.isProfileConfirmed = true;
        });
     }

    onClickCreateProfile() {
        this.isProfileConfirmed = true;
    }

    onSubmitCreateProfile() {
        this.profileService.createDeveloperProfile(localStorage.getItem('uid'), this.consumerProfile).subscribe(
            (response) => {
                if (response.status === 200) {
                // Success response, so lets go back to the developer home page.
                    this.router.navigate(['/store/profile']);
                }
            },
            () => { // Handle failure to create profile 
                }
        );
    }

    onClickCloseProfile() {
         this.router.navigate(['/store']);
    }
}
