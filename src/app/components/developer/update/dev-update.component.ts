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
import {DeveloperApplication, DeveloperApplicationsService} from '../../../core';

@Component({
    selector: 'bo-developer-application',
    templateUrl: './dev-update.component.html'
})
export class DeveloperApplicationUpdateComponent implements OnInit {
    private newApplication: DeveloperApplication = {rid: undefined,
        description: undefined, category: undefined,
        whatsNew: undefined, developer: undefined,
        downloadUrl: undefined, name: undefined,
        state: undefined, version: undefined};
        
    constructor(private developerAppsService: DeveloperApplicationsService,
                private router: Router) {}

    ngOnInit() {
    }

    onSubmitCreateApplicationUpdate() {
        this.developerAppsService.createApplicationUpdate(localStorage.getItem('uid'), localStorage.getItem('appid'), this.newApplication).subscribe(
            (response) => {
                if (response.status === 200) {
                // Success response, so lets go back to the developer home page.
                    this.router.navigate(['/apps']);
                }
            }
        );
    }
}