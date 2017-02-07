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
    styleUrls: ['./dev-app-details.component.css']
})
export class DeveloperApplicationDetailsComponent implements OnInit {
    appID: string = localStorage.getItem('appid');
    devAppObservable: Observable<any>;
    application: DeveloperApplication = {
        rid: undefined,
        description: undefined, category: { id: undefined, name: undefined },
        whatsNew: undefined, developer: undefined,
        name: undefined, state: 'Staging',
        version: undefined, installers: []
    };
    categoryArray: Code[] = [];
    categoryObservable: Observable<any>;
    nameIsUnique: boolean = true;
    originalAppName: string = '';
    $index: any;
    downlodUrlValidation: boolean = false;

    constructor(private developerAppsService: DeveloperApplicationsService,
        private codeService: CodeDefinitionService,
        private router: Router) { }

    ngOnInit() {
        this.devAppObservable = this.developerAppsService.getApplicationById(this.appID);
        this.devAppObservable.subscribe(next => {
            this.application = next;
            this.originalAppName = this.application.name;
        });
        this.categoryObservable = this.codeService.getCategoryCodes();
        this.categoryObservable.subscribe(next => this.categoryArray = next);
        this.nameIsUnique = true;
    }

    onChangeAppName() {
        if (this.application.name !== this.originalAppName) {
            this.developerAppsService.checkApplicationNameExistsForDeveloper(this.application.name).subscribe(
                (response) => {
                    if (response.status === 200) {
                        this.nameIsUnique = false;
                    } else {
                        this.nameIsUnique = true;
                    }
                }
            );
        }
    }

    onSubmitViewDetails(event) {
        if (event === 'save') {
            let downloadUrlFound = false;
            for (let i = 0; i < this.application.installers.length; i++) {
                if (this.application.installers[i].downloadUrl !== '' && this.application.installers[i].downloadUrl) {
                    downloadUrlFound = true;
                }
            }
            if (downloadUrlFound === true) {
                this.downlodUrlValidation = false;
            } else {
                this.downlodUrlValidation = true;
                return false;
            }
            if (this.nameIsUnique === true) {
                this.developerAppsService.updateDeveloperApplication(localStorage.getItem('appid'), this.application).subscribe(
                    (response) => {
                        if (response.status === 200) {
                            // Success response, so lets go back to the developer home page.
                            this.router.navigate(['/developer/apps']);
                        }
                    }
                );
            }
        }
        if (event === 'publish') {
            if (this.nameIsUnique === true) {
                this.developerAppsService.updateAndPublishDeveloperApplication(localStorage.getItem('appid'), this.application).subscribe(
                    (response) => {
                        if (response.status === 200) {
                            // Success response, so lets go back to the developer home page.
                            this.router.navigate(['/developer/apps']);
                        }
                    }
                );
            }
        }
        if (event === 'recall') {
            this.developerAppsService.recallDeveloperApplication(localStorage.getItem('appid')).subscribe(
                (response) => {
                    if (response.status === 200) {
                        // Success response, so lets go back to the developer home page.
                        this.router.navigate(['/developer/apps']);
                    }
                }
            );
        }
        if (event === 'create') {
            localStorage.setItem('name', this.application.name.toString());
            this.router.navigate(['/developer/update']);
        }
        if (event === 'close') {
            this.router.navigate(['/developer/apps']);
        }
    }
    installerChanged(inst) {
        this.application.installers.forEach((part, index, installers) => {
            if (part.os === inst.os && part.platform === inst.platform) {
                installers[index] = part;
            }
        });
    }
}
