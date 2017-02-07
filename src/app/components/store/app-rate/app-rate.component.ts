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

import {Component, Input, OnInit} from '@angular/core';
import {StoreService, LoginService, UserService, ApplicationRatingService} from '../../../core';
import {Router} from '@angular/router';
import {Rate } from '../../../core';

@Component({
    selector: 'bo-app-rate',
    templateUrl: './app-rate.component.html',
    styleUrls: ['./app-rate.component.css']
})
export class ApplicationRateComponent implements OnInit {
    @Input() applicationId: string;

    appRate: string;
    appRateLikeNum: number;
    appRateUnlikeNum: number;

    rate: Rate = {
        rid: undefined,
        applicationId: undefined, rating: undefined,
        consumer: undefined, createBy: undefined};

    isSubscribled: boolean = false;
    isSignedIn: boolean = false;
    likeFlag: boolean = true;
    unlikeFlag: boolean = true;
    constructor(public storeService: StoreService,
                private router: Router,
                private loginService: LoginService,
                private userService: UserService,
                private applicationRatingService: ApplicationRatingService) {}

    ngOnInit() {
        this.isSignedIn = this.loginService.isSignedIn();

        if (this.isSignedIn) {
             this.storeService.checkAppIsSubscibed(this.applicationId).subscribe(
                (response) => {
                    if (response.status === 200) {
                        this.isSubscribled = true;
                    } else {
                        this.isSubscribled = false;
                    }
                }
            );

            this.applicationRatingService.checkUserRate(this.applicationId).subscribe(
                (response) => {
                   this.appRate = <string>response.text();
                }
            );
        }

        this.applicationRatingService.getRateLikeNumber(this.applicationId, '0').subscribe(
                (response) => {
                   this.appRateLikeNum = response.json();
                }
            );

         this.applicationRatingService.getRateLikeNumber(this.applicationId, '1').subscribe(
                (response) => {
                   this.appRateUnlikeNum = response.json();
                }
            );




    }

    onRateApp(event) {
        if (event === 'like') {
            if (!this.isSubscribled) {
                return;
            }
            if (!this.likeFlag) {
                return;
            }
            this.likeFlag = false;
            if (this.appRate === '0') {
                    this.rate.rating = '2';
            }else  {
                this.rate.rating = '0';
            }
            this.rate.applicationId = this.applicationId;
            this.applicationRatingService.createReview(this.applicationId, this.rate).subscribe(
            (response) => {
                if (this.appRate === '0') {
                    this.appRateLikeNum--;
                }else  {
                    if (this.appRate === '1') {
                        this.appRateLikeNum++;
                        this.appRateUnlikeNum--;
                    }else  {
                        this.appRateLikeNum++;
                    }
                }
                this.appRate = this.rate.rating;
                this.likeFlag = true;
            });
        }
        if (event === 'dislike') {
            if (!this.isSubscribled) {
                return;
            }
            if (!this.unlikeFlag) {
                return;
            }
            if (this.appRate === '1') {
                this.rate.rating = '2';
            }else {
                this.rate.rating = '1';
            }
            this.rate.applicationId = this.applicationId;
            this.applicationRatingService.createReview(this.applicationId, this.rate).subscribe(
            (response) => {
                if (this.appRate === '1') {
                this.appRateUnlikeNum--;
                }else {
                    if (this.appRate === '0') {
                        this.appRateLikeNum--;
                        this.appRateUnlikeNum++;
                    }else {
                        this.appRateUnlikeNum++;
                    }
                 }
                 this.appRate = this.rate.rating;
                 this.unlikeFlag = true;
            });
        }
    }
}
