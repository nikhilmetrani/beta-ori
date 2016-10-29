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

import { Injectable} from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import {DeveloperApplication} from '../';
import {JsonHttp} from './json-http';

@Injectable()
export class DeveloperApplicationsService {
    appsUrl: string = '/api/0/developer/';

    constructor(private http: JsonHttp) {}

    getApplications(developerId: string) {
        return this.http.get(this.getApplicationsUrl())
            .map((response) => <DeveloperApplication[]> response.json().applications)
            .catch(this.logError);
    }

    createApplication(developerId: string, application: DeveloperApplication) {
        return this.http.post(this.getApplicationsUrl() + '/create', application);
    }

    // modifyDeveloperProfile(developerId: string, profile: DeveloperProfile) {
    //     return this.http.post(this.getAppCreateUrl(developerId), profile);
    // }

    getApplicationsUrl(): string {
        return this.appsUrl + '/applications';
    }

    // private extractData(res: Response): DeveloperProfile {
    //     try {
    //         let body = res.json();
    //         return body || undefined;
    //     } catch (err) {
    //         return undefined;
    //     }
    // }

    logError(err: Response) {
        return Observable.throw(err.json().error || 'Server error');
    }
}
