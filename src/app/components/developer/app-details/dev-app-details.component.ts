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
import { DeveloperApplication, DeveloperApplicationsService, Code, CodeDefinitionService } from '../../../core';

@Component({
    selector: 'bo-dev-app-details',
    templateUrl: './dev-app-details.component.html',
    styleUrls: ['./dev-app-details.component.css'],
    providers: [CodeDefinitionService]
})
export class DeveloperApplicationDetailsComponent implements OnInit {

    appID = localStorage.getItem('appid');
    devAppObservable: Observable<any>;
    application: DeveloperApplication = {
        rid: undefined,
        description: undefined, category: { id: undefined, name: undefined },
        whatsNew: undefined, developer: undefined,
        downloadUrl: undefined, name: undefined,
        state: undefined, version: undefined
    };
    categoryArray: Code[] = [];
    categoryObservable: Observable<any>;


    constructor(private developerAppsService: DeveloperApplicationsService, private codeService: CodeDefinitionService,
        private router: Router) { }

    ngOnInit() {
        this.devAppObservable = this.developerAppsService.getApplicationById(this.appID);
        this.devAppObservable.forEach(next => {
            // console.log(next);
            this.application = next;
        });

        this.categoryObservable = this.codeService.getCategoryCodes();
        this.categoryObservable.forEach(next => this.categoryArray = next);
    }

    onSubmitViewDetails(event) {

        if (event === 'save') {
            if (this.application.state === 'Recalled') {
                this.application.state = 'Staging';
            }
            this.developerAppsService.updateDeveloperApplication(localStorage.getItem('appid'), this.application).subscribe(
                (response) => {
                    if (response.status === 200) {
                        // Success response, so lets go back to the developer home page.
                        this.router.navigate(['/apps']);
                    }
                }
            );
        }
        if (event === 'publish') {
            this.developerAppsService.updateAndPublishDeveloperApplication(localStorage.getItem('appid'), this.application).subscribe(
                (response) => {
                    if (response.status === 200) {
                        // Success response, so lets go back to the developer home page.
                        this.router.navigate(['/apps']);
                    }
                }
            );
        }
        if (event === 'recall') {
            this.developerAppsService.recallDeveloperApplication(localStorage.getItem('appid')).subscribe(
                (response) => {
                    if (response.status === 200) {
                        // Success response, so lets go back to the developer home page.
                        this.router.navigate(['/apps']);
                    }
                }
            );
        }
        if (event === 'create') {
            localStorage.setItem('name', this.application.name.toString());
            this.router.navigate(['/apps/update']);
        }
        if (event === 'close') {

            this.router.navigate(['/apps']);
        }
    }
}
