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
    constructor(public storeService: StoreService,
                private router: Router,
                private loginService: LoginService,
                private userService: UserService,
                private applicationRatingService: ApplicationRatingService) {}

    ngOnInit() {
        this.isSignedIn = this.loginService.isSignedIn();

        if (this.isSignedIn) {
             this.storeService.checkAppIsSubscibled(this.applicationId).subscribe(
                (response) => {
                    console.log(response);
                    if (response.status === 200) {
                        this.isSubscribled = true;
                    } else {
                        this.isSubscribled = false;
                    }
                }
            );

            this.applicationRatingService.checkUserRate(this.applicationId).subscribe(
                (response) => {
                   this.appRate = response.json();
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
            if (this.appRate === '0') {
                this.rate.rating = '2';
                this.appRateLikeNum--;
            }else  {
                this.rate.rating = '0';
                if (this.appRate === '1') {
                    this.appRateLikeNum++;
                    this.appRateUnlikeNum--;
                }else  {
                    this.appRateLikeNum++;
                }
            }
            this.rate.applicationId = this.applicationId;
            this.applicationRatingService.createReview(this.applicationId, this.rate).subscribe(
            (response) => {
                this.appRate = this.rate.rating;
               console.log(this.appRate);
            });
        }
        if (event === 'dislike') {
            if (this.appRate === '1') {
                this.rate.rating = '2';
                this.appRateUnlikeNum--;
            }else {
                this.rate.rating = '1';
                 if (this.appRate === '0') {
                    this.appRateLikeNum--;
                    this.appRateUnlikeNum++;
                }else {
                    this.appRateUnlikeNum++;
                }
            }
            this.rate.applicationId = this.applicationId;
            this.applicationRatingService.createReview(this.applicationId, this.rate).subscribe(
            (response) => {
                 this.appRate = this.rate.rating;
            });
        }
    }
}
