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

import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import { DeveloperApplication, Rate } from '../';
import { JsonHttp } from './json-http';

@Injectable()
export class ApplicationRatingService {
    appsUrl: string = '/api/0/consumer/';

    constructor(private http: JsonHttp) { }

    getApplications(developerId: string) {
        return this.http.get(this.getApplicationsUrl())
            .map((response) => <DeveloperApplication[]>response.json().applications)
            .catch(this.logError);
    }


    getApplicationById(applicationId: string) {
        return this.http.get(this.getApplicationsUrl() + '/' + applicationId)
            .map((response) => {
                return <DeveloperApplication>response.json();
            })
            .catch(this.logError);
    }

    createReview(applicationId: string, rate: Rate) {
        return this.http.post(this.getRateUrl(applicationId) + 'create', rate);
    }

    checkUserRate(applicationId: string) {
        return this.http.get(this.getRateUrl(applicationId) + 'checkUserRate');
    }

    getRateLikeNumber(applicationId: string, rateType: string) {
        return this.http.get(this.getRateUrlWithNoLogin(applicationId) + 'getRateLikeNum/' + rateType);
    }

    updateDeveloperApplication(applicationId: string, application: DeveloperApplication) {
        return this.http.post(this.getApplicationsUrl() + '/' + applicationId + '/update', application);
    }

    recallDeveloperApplication(applicationId: string) {
        return this.http.post(this.getApplicationsUrl() + '/' + applicationId + '/recall', '');
    }

    checkApplicationNameExistsForDeveloper(applicationName: string) {
        return this.http.get(this.getApplicationsUrl() + '/check?name=' + applicationName);
    }

    getApplicationsUrl(): string {
        return this.appsUrl + 'applications';
    }

    getRateUrl(applicationId: string): string {
        return this.appsUrl + applicationId + '/rating/';
    }

    getRateUrlWithNoLogin(applicationId: string): string {
        return '/api/1/consumer/' + applicationId + '/rating/';
    }

    logError(err: Response) {
        return Observable.throw(err.json().error || 'Server error');
    }
}
