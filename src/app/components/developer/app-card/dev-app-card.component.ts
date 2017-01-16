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

import { Component, Input, OnInit } from '@angular/core';
import { DeveloperApplication } from '../../../core';
import { Router } from '@angular/router';

@Component({
    selector: 'bo-dev-app-card',
    templateUrl: './dev-app-card.component.html',
    styleUrls: ['./dev-app-card.component.css'],
    // template: '<bo-dev-app-details></bo-dev-app-details>'
})
export class DeveloperApplicationCardComponent implements OnInit {
    @Input() application: DeveloperApplication;
    uploadURL: string;
    imageExtensions = ['image/png', 'image/jpg'];

    constructor(private router: Router) { }

    ngOnInit() {
        this.uploadURL = '/api/0/developer/applications/' + this.application.rid.toString() + '/image';
    }

    viewApplicationDetails() {
        localStorage.setItem('appid', this.application.rid.toString());
    }
}
