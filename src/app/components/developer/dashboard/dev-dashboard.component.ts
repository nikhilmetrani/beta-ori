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
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';
import {DeveloperApplication, DeveloperApplicationsService, DeveloperReportsService} from '../../../core';

@Component({
    selector: 'bo-dev-dashboard',
    templateUrl: './dev-dashboard.component.html',
    styleUrls: ['./dev-dashboard.component.css']
})
export class DeveloperDashboardComponent implements OnInit {
    query: string = '';
    applicationId: string = '';
    selectedEndDate: string = '';
    selectedStartDate: string = '';
    totalSubscriptions: number = 0;
    activeSubscriptions: number = 0;
    terminatedSubscriptions: number = 0;
    devAppsObservable: Observable<any>;
    devAppsArray: DeveloperApplication[] = [];

    options: any = {
        dateFormat: 'yyyymmdd',
        inline: false,
        selectionTxtFontSize: '15px',
        showTodayBtn: true,
        todayBtnTxt: 'Today',
        showClearDateBtn: false
    };

    constructor(private router: Router, private devAppsService: DeveloperApplicationsService,
                private devReportsService: DeveloperReportsService) {
    }

    ngOnInit() {
        this.devAppsObservable = this.devAppsService.getAllActiveApplications(localStorage.getItem('uid'));
        this.devAppsObservable.forEach(next => this.devAppsArray = next);
    }

    onSearchReport() {
        this.devReportsService.findSubscribedUsersPerApplication(this.applicationId, this.selectedStartDate,
            this.selectedEndDate).subscribe(
            (response) => {
                if (response.status === 200) {
                    this.totalSubscriptions = <number>response.json();
                }
            }
        );

        this.devReportsService.findActiveSubscribedUsersPerApplication(this.applicationId, this.selectedStartDate,
            this.selectedEndDate).subscribe(
            (response) => {
                if (response.status === 200) {
                    this.activeSubscriptions = <number>response.json();
                }
            }
        );

        this.devReportsService.findTerminatedSubscribedUsersPerApplication(this.applicationId, this.selectedStartDate,
            this.selectedEndDate).subscribe(
            (response) => {
                if (response.status === 200) {
                    this.terminatedSubscriptions = <number>response.json();
                }
            }
        );
    }

    onStartDateChanged(event: any) {
        console.log('onStartDateChanged(): ', event.date, ' - jsdate: ', new Date(event.jsdate).toLocaleDateString(),
            ' - formatted: ', event.formatted, ' - epoc timestamp: ', event.epoc);
        if (event.formatted !== '') {
            this.selectedStartDate = event.formatted;
        }
    }

    onEndDateChanged(event: any) {
        console.log('onEndDateChanged(): ', event.date, ' - jsdate: ', new Date(event.jsdate).toLocaleDateString(),
            ' - formatted: ', event.formatted, ' - epoc timestamp: ', event.epoc);
        if (event.formatted !== '') {
            this.selectedEndDate = event.formatted;
        }
    }

}
