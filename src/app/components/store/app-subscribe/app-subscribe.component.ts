import {Component, Input, OnInit} from '@angular/core';
import {StoreService, LoginService, UserService} from '../../../core';
import {Router} from '@angular/router';

@Component({
    selector: 'bo-app-subscribe',
    templateUrl: './app-subscribe.component.html',
    styleUrls: ['./app-subscribe.component.css']
})
export class ApplicationSubscriptionComponent implements OnInit {
    @Input() applicationId: string;

    isSubscribled: boolean = false;
    isSignedIn: boolean;
    constructor(public storeService: StoreService,
                private router: Router,
                private loginService: LoginService,
                private userService: UserService) {}

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
        }
    }

    onSubscribleApp(event) {
        if (event === 'sub') {
             if (!this.isSignedIn) {
                        this.router.navigate(['/login']);
                    }else {
                         this.storeService.subscribeApplication(this.applicationId).subscribe(
                (response) => {
                    if (response.status === 400) {
                        // bad request - Show message
                    } else {
                        this.isSubscribled = true;
                    }
                }
                    );

                    }
                        }
        if (event === 'unsub') {
            this.storeService.unsubscribeApplication(this.applicationId).subscribe(
                (response) => {
                    if (response.status === 403) {
                        // forbidden - shouldn't happen 
                    } else {
                        this.isSubscribled = false;
                    }
                }
            );
        }
    }
}
