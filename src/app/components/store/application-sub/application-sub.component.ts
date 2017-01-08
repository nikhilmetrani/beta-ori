import {Component, Input} from '@angular/core';
import {StoreService} from '../../../core';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute} from '@angular/router';
import {StoreApplication, Category} from '../../../core';

@Component({
    selector: 'bo-application-sub',
    templateUrl: './application-sub.component.html',
    styleUrls: ['./application-sub.component.css']
})
export class ApplicationSubscriptionComponent {
    @Input() applicationId: string;

     isSubscribled: boolean = false; 

    constructor(public storeService: StoreService, private route: ActivatedRoute) {
        this.storeService.checkAppIsSubscibled(this.applicationId).subscribe(
                (response) =>{
                    console.log(response);
                    if (response.status === 200) {
                        this.isSubscribled = true;
                    }      
                    else
                    {
                        this.isSubscribled = false;                    
                    }              
                }
            ) 
        }

    onSubscribleApp(event) {

        if (event === 'sub') {
            this.storeService.subscribeApplication(this.applicationId).subscribe(
                (response) =>{
                    console.log(response);
                    if (response.status === 403) {
                        //forbidden - popup login page 
                    }
                    if(response.status === 400) {
                        //bad request - Show message
                    }
                    else{
                        this.isSubscribled = true;
                    }
                }
            )           
        }
        if (event === 'unsub') {
            this.storeService.unsubscribeApplication(this.applicationId).subscribe(
                (response) =>{
                    console.log(response);
                    if (response.status === 403) {
                        //forbidden - shouldn't happen 
                    }                    
                    else{
                        this.isSubscribled = false;
                    }
                }
            )  
        }        
    }
}