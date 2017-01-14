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
import { DeveloperApplication, Installer, DeveloperApplicationsService, Code, CodeDefinitionService } from '../../../core';

@Component({
    selector: 'bo-developer-application',
    templateUrl: './dev-app.component.html',
    styleUrls: ['./dev-app.component.css'],
    providers: [CodeDefinitionService]
})
export class DeveloperApplicationComponent implements OnInit {
    newApplication: DeveloperApplication = {
        rid: undefined,
        description: undefined, category: undefined,
        whatsNew: undefined, developer: undefined,
        name: undefined, state: undefined,
        version: undefined, installers: [
            {
                rid: undefined,
                platform: 'x64', os: 'Windows',
                downloadUrl: undefined, expressInstallCommand: undefined,
                selected: false
            },
            {
                rid: undefined,
                platform: 'x86', os: 'Windows',
                downloadUrl: undefined, expressInstallCommand: undefined,
                selected: false
            },
            {
                rid: undefined,
                platform: 'x64', os: 'Mac',
                downloadUrl: undefined, expressInstallCommand: undefined,
                selected: false
            },
            {
                rid: undefined,
                platform: 'x64', os: 'Linux',
                downloadUrl: undefined, expressInstallCommand: undefined,
                selected: false
            },
            {
                rid: undefined,
                platform: 'x86', os: 'Linux',
                downloadUrl: undefined, expressInstallCommand: undefined,
                selected: false
            }
        ]
    };
    newInstaller: Installer = {
        rid: undefined,
        platform: '', os: '',
        downloadUrl: undefined, expressInstallCommand: undefined,
        selected: false
    };
    categoryArray: Code[] = [];
    categoryObservable: Observable<any>;

    nameIsUnique: boolean = true;
    selectedAll: boolean = false;

    constructor(private developerAppsService: DeveloperApplicationsService, private codeService: CodeDefinitionService,
        private router: Router) { }

    ngOnInit() {
        this.categoryObservable = this.codeService.getCategoryCodes();
        this.categoryObservable.forEach(next => this.categoryArray = next);
    }

    onChangeAppName() {
        this.developerAppsService.checkApplicationNameExistsForDeveloper(this.newApplication.name).subscribe(
            (response) => {
                if (response.status === 200) {
                    this.nameIsUnique = false;
                } else {
                    this.nameIsUnique = true;
                }
            });
    }

    onSubmitCreateApplication(event) {
        if (event === 'publish') {
            this.developerAppsService.createAndPublishDeveloperApplication(localStorage.getItem('uid'), this.newApplication).subscribe(
                (response) => {
                    if (response.status === 200) {
                        // Success response, so lets go back to the developer home page.
                        this.router.navigate(['/developer/apps']);
                    }
                }
            );
        } else if (event === 'close') {
            this.router.navigate(['/developer/apps']);
        } else {
            this.developerAppsService.createApplication(localStorage.getItem('uid'), this.newApplication).subscribe(
                (response) => {
                    if (response.status === 200) {
                        // Success response, so lets go back to the developer home page.
                        this.router.navigate(['/developer/apps']);
                    }
                }
            );
        }
    }

    onSubmitInstaller(event) {
        if (event === 'add') {
            this.newApplication.installers.push({
                'rid': undefined,
                'platform': '',
                'os': '',
                'downloadUrl': '',
                'expressInstallCommand': '',
                selected: false
            });
        } else if (event === 'remove') {
            let newDataList = [];
            let objDeleted = false;
            for (let i = 0; i < this.newApplication.installers.length; i++) {
                if (this.newApplication.installers[i].selected === true) {
                    newDataList.push(this.newApplication.installers[i]);
                    this.newApplication.installers[i].selected = false;
                    objDeleted = true;
                }
            }
            if (newDataList.length > 0) {
                this.newApplication.installers = newDataList;
            } else if (objDeleted === true) {
                this.newApplication.installers = [];
                this.newApplication.installers.push({
                    'rid': undefined,
                    'platform': '',
                    'os': '',
                    'downloadUrl': '',
                    'expressInstallCommand': '',
                    selected: false
                });
            }
        }
    }

    checkAll() {
        this.selectedAll = !this.selectedAll;
        for (let i = 0; i < this.newApplication.installers.length; i++) {
            this.newApplication.installers[i].selected = this.selectedAll;
        }
    }
}
