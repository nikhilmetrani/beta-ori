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
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {DeveloperApplication, DeveloperApplicationsService} from '../../../core';

@Component({
    selector: 'bo-dev-apps',
    templateUrl: './dev-apps.component.html',
    styleUrls: ['./dev-apps.component.css']
})
export class DeveloperApplicationsComponent implements OnInit {
    query: string = '';
    hideActiveApps: boolean = false;
    uploadURL: string = '/api/0/developer/applications/8a8a98fb597c3fed01597c42e44a0000/image';
    imageExtensions = ['image/png', 'image/jpg'];
    devAppsObservable: Observable<any>;
    devAppsArray: DeveloperApplication[] = [];
    constructor(private router: Router, private devAppsService: DeveloperApplicationsService) {}

    ngOnInit() {
        this.devAppsObservable = this.devAppsService.getApplications(localStorage.getItem('uid'));
        this.devAppsObservable.subscribe(next => this.devAppsArray = next);
    }

    createNewApplication() {
        // Navigate by URL to call parent route
        this.router.navigateByUrl('/developer/create');
    }

    onHideActiveApps(flag) {
        this.hideActiveApps = flag;
    }

    onClickCleanSearch() {
        this.query = '';
    }
}
