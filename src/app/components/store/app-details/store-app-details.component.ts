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

import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { StoreApplication, StoreService, ConsumerReviewService, LoginService, Review, UserService } from '../../../core';

@Component({
    selector: 'bo-dev-app-details',
    templateUrl: './store-app-details.component.html',
    styleUrls: ['./store-app-details.component.css'],
    providers: [ConsumerReviewService],

})


export class StoreApplicationDetailsComponent implements OnInit {
    @Input() applicationId: string;
    appid: string;
    application: StoreApplication = {
        rid: undefined,
        name: undefined, category: {id: undefined, name: undefined},
        developer: { rid: undefined, username: undefined, firstname: undefined,
        lastname: undefined, email: undefined, authorities: undefined,
        enabled: undefined },
        links: [], isFavorite: undefined,
        version: undefined, reviews: []
    };
    newreview: Review =  { rid: undefined, applicationId: undefined,
        consumer: { rid: undefined, username: undefined, firstname: undefined,
        lastname: undefined, email: undefined, authorities: undefined,
        enabled: undefined }, title: undefined, description: undefined,
        featured: undefined, createBy: undefined, creationDate: undefined
        };
    devAppObservable: Observable<any>;
    developerObservable: Observable<any>;
    reviewItems: Review[] = [];
    isSubscribled: boolean = false;
    isSignedIn: boolean = false;
    isEmployee: boolean = false;
    devIsActive: boolean = true;
    constructor( private storeService: StoreService,
    private consumerReviewService: ConsumerReviewService,
    private loginService: LoginService, private router: Router,
    private userService: UserService) { }

    ngOnInit() {
        this.isSignedIn = this.loginService.isSignedIn();
        this.appid = localStorage.getItem('rid');
        this.devAppObservable = this.storeService.getApplicationById(localStorage.getItem('rid'));
        this.devAppObservable.subscribe(app => {
           this.application = app;
           this.reviewItems = app.reviews;
        });
        this.developerObservable = this.storeService.getApplicationDeveloperByAppId(localStorage.getItem('rid'));
        this.developerObservable.subscribe(dev => {
           this.application.developer.rid = dev.rid;
           this.devIsActive = dev.enabled;
        });
        if (this.isSignedIn) {
            this.storeService.checkAppIsSubscibed(this.appid).subscribe(
                (response) => {
                    if (response.status === 200) {
                        this.isSubscribled = true;
                    } else {
                        this.isSubscribled = false;
                    }
                }
            );
            this.userService.get('user').subscribe((user) => {
                user.authorities.forEach(auth => {
                    if (auth.authority === 'ROLE_MAINTAINER' || auth.authority === 'ROLE_MANAGER') {
                        this.isEmployee = true;
                    }
                });
                // console.log(user.authorities);
            });
        }
    }

   onSubmitViewDetails(event) {
        if (event === 'save') {
            if (this.isSubscribled) {
                this.consumerReviewService.createNewReview(localStorage.getItem('rid'), this.newreview).subscribe(
                        (response) => {
                            if (response.status === 400) {
                                // bad request - Show message
                            } else {
                                this.router.navigate(['/store/app/details']);
                                location.reload();
                            }
                        }
                    );
            }
        }

        if (event === 'close') {
            this.router.navigate(['/store/apps']);
        }
    }

    subscriptionChanged(status) {
        this.isSubscribled = status.value;
    }

    onClickBlockUser(rid) {
            this.userService.block(rid).subscribe(
                (response) => {
                    if (response.status === 200) {
                        this.devIsActive = false;
                        this.router.navigate(['/store/app/details']);
                    }
                },
                () => { // Handle failure to create profile 
                }
            );
    }
}
