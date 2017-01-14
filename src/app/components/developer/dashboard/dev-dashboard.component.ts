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
import {Observable} from "rxjs/Observable";
import {Router} from "@angular/router";
import {DeveloperApplication, DeveloperApplicationsService, DeveloperReportsService} from '../../../core';

@Component({
    selector: 'bo-dev-dashboard',
    templateUrl: './dev-dashboard.component.html',
    styleUrls: ['./dev-dashboard.component.css']
})
export class DeveloperDashboardComponent implements OnInit {
    query: string = '';
    devAppsObservable: Observable<any>;
    devAppsArray: DeveloperApplication[] = [];

    constructor(private router: Router, private devAppsService: DeveloperApplicationsService, private devReportsService: DeveloperReportsService) {
    }

    ngOnInit() {
        this.devAppsObservable = this.devAppsService.getApplications(localStorage.getItem('uid'));
        this.devAppsObservable.forEach(next => this.devAppsArray = next);
    }

    // onGettingReport() {
    //     this.devReportsService.findSubscribedUsersPerApplication(localStorage.getItem('uid'), this.newApplication).subscribe(
    //         (response) => {
    //             if (response.status === 200) {
    //                 // Success response, so lets go back to the developer home page.
    //                 this.router.navigate(['/developer/apps']);
    //             }
    //         }
    //     );
    // }

}
