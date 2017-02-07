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
import { DeveloperApplication, DeveloperApplicationsService } from '../../../core';

@Component({
    selector: 'bo-developer-application',
    templateUrl: './dev-update.component.html'
})
export class DeveloperApplicationUpdateComponent implements OnInit {
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
                launchCommand: undefined, uninstallCommand: undefined,
                selected: false
            },
            {
                rid: undefined,
                platform: 'x86', os: 'Windows',
                downloadUrl: undefined, expressInstallCommand: undefined,
                launchCommand: undefined, uninstallCommand: undefined,
                selected: false
            },
            {
                rid: undefined,
                platform: 'x64', os: 'Mac',
                downloadUrl: undefined, expressInstallCommand: undefined,
                launchCommand: undefined, uninstallCommand: undefined,
                selected: false
            },
            {
                rid: undefined,
                platform: 'x64', os: 'Linux',
                downloadUrl: undefined, expressInstallCommand: undefined,
                launchCommand: undefined, uninstallCommand: undefined,
                selected: false
            },
            {
                rid: undefined,
                platform: 'x86', os: 'Linux',
                downloadUrl: undefined, expressInstallCommand: undefined,
                launchCommand: undefined, uninstallCommand: undefined,
                selected: false
            }
        ]
    };
    $index = 0;
    // categoryArray: Code[] = [];
    // categoryObservable: Observable<any>;
    downlodUrlValidation: boolean = false;


    constructor(private developerAppsService: DeveloperApplicationsService,
        private router: Router) { }

    ngOnInit() {
        this.newApplication.name = localStorage.getItem('name');
    }

    onSubmitCreateApplicationUpdate(event) {
        if (event === 'create') {
            let downloadUrlFound = false;
            for (let i = 0; i < this.newApplication.installers.length; i++) {
                if (this.newApplication.installers[i].downloadUrl !== '' && this.newApplication.installers[i].downloadUrl) {
                    downloadUrlFound = true;
                }
            }
            if (downloadUrlFound === true) {
                this.downlodUrlValidation = false;
            } else {
                this.downlodUrlValidation = true;
                return false;
            }
            this.developerAppsService.createApplicationUpdate(
                localStorage.getItem('uid'),
                localStorage.getItem('appid'),
                this.newApplication).subscribe(
                (response) => {
                    if (response.status === 200) {
                        // Success response, so lets go back to the developer home page.
                        this.router.navigate(['/developer/apps']);
                    }
                }
                );
        }
        if (event === 'close') {

            this.router.navigate(['/developer/details']);
        }
    }

    installerChanged(inst) {
        this.newApplication.installers.forEach((part, index, installers) => {
            if (part.os === inst.os && part.platform === inst.platform) {
                installers[index] = part;
            }
        });
    }
}
