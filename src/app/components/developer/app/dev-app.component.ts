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
            platform: undefined, os: undefined,
            downloadUrl: undefined, expressInstallCommand: undefined
        }
    ]
    };
    newInstaller: Installer = {
        rid: undefined,
        platform: undefined, os: undefined,
        downloadUrl: undefined, expressInstallCommand: undefined
    };
    categoryArray: Code[] = [];
    categoryObservable: Observable<any>;

        nameIsUnique: boolean = true ;
    selectedAll: string;
    installer_selected: string[] = [];

    constructor(private developerAppsService: DeveloperApplicationsService, private codeService: CodeDefinitionService,
        private router: Router) { }

    ngOnInit() {
        this.categoryObservable = this.codeService.getCategoryCodes();
        this.categoryObservable.forEach(next => this.categoryArray = next);
    }

     onChangeAppName(){
         console.log(this.newApplication.name);
         this.developerAppsService.checkApplicationNameExistsForDeveloper(this.newApplication.name).subscribe(
                (response) => {                  
                    if(response.status === 200){
                        this.nameIsUnique = false;                        
                    }
                    else
                    {                        
                        this.nameIsUnique = true;
                    }
                }
                
            );  

         
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
        if(event=='add') {
            this.newApplication.installers.push({
                'rid': undefined,
                'platform': "",
                'os': "",
                'downloadUrl': "",
                'expressInstallCommand': ""
            });
        } else if(event=='remove') {
            var newDataList = []; 
            alert(this.selectedAll);
            if(this.selectedAll=='Y') {
                this.newApplication.installers = [];
            }else{
                alert(this.installer_selected.length);
                for(var i=0; i<this.installer_selected.length; i++) {
                    alert(this.installer_selected[i]);
                    if(this.installer_selected[i]!='Y') {
                        newDataList.push(this.newApplication.installers[i]);
                    }
                }
                this.newApplication.installers = newDataList;
            }
        }
    }

    checkAll() {
        alert(this.installer_selected.length)
        for(var i=0; i<this.installer_selected.length; i++) {
            if (this.selectedAll = 'Y') {
                this.installer_selected[i]='Y';
            }else{
                this.installer_selected[i]='N';
            }
        }
    }
}
