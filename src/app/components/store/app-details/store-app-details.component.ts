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

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { StoreApplication, StoreService, Review } from '../../../core';

@Component({
    selector: 'bo-dev-app-details',
    templateUrl: './store-app-details.component.html',
    styleUrls: ['./store-app-details.component.css'],
})


export class StoreApplicationDetailsComponent implements OnInit {
        application: StoreApplication = {
        rid: undefined,
        name: undefined, category: {id: undefined, name: undefined},
        developer: { rid: undefined, username: undefined, firstname: undefined,
        lastname: undefined, email: undefined, authorities: undefined,
        enabled: undefined },
        links: [], isFavorite: undefined,
        version: undefined, reviews: []
    };
    devAppObservable: Observable<any>;
    reviewItems: Review[] = [];
    constructor( private storeService: StoreService, private router: Router ) { }

    ngOnInit() {
        this.devAppObservable = this.storeService.getApplicationById(localStorage.getItem('rid'));
        this.devAppObservable.subscribe(app => {
            this.application = app;
            console.log(app.reviews);
            this.reviewItems = app.reviews;
        });
}

   onSubmitViewDetails(event) {
        if (event === 'close') {
            this.router.navigate(['/store/apps']);
        }
    }
}
