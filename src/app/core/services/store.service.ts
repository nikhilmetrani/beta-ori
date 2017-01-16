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

import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import {StoreApplication} from '../';
import {JsonHttp} from './json-http';

@Injectable()
export class StoreService {
    storeUrl: string = '/api/1/store/';
    storeUrlforLoginUser: string = '/api/0/store/';

    constructor(private http: JsonHttp) {}

    getApplications() {
        return this.makeRequest('');
    }

    getApplicationsByCategory(category: string) {
        return this.makeRequest(category);
    }

    private makeRequest(path: string) {
        let url = `${ this.storeUrl }${ path }`;
        return this.http.get(url)
            .map((response) => <StoreApplication[]> response.json().applications)
            .catch(this.logError);
    }

    logError(err: Response) {
        return Observable.throw(err.json().error || 'Server error');
    }

    searchApplications(keyword: string) {
        return this.makeRequest('search?keyword=' + keyword);
    }

    searchApplicationsByCategory(categoryId: string, keyword: string) {
        return this.makeRequest('search/category/' + categoryId + '?keyword=' + keyword);
    }

    subscribeApplication(applicationId: string) {
        return this.http.post(this.storeUrlforLoginUser + 'applications/' + applicationId + '/subscribe', '')
            .map((response) => {
                return <StoreApplication>response.json();
            })
            .catch(this.logError);
    }

    unsubscribeApplication(applicationId: string) {
        return this.http.post(this.storeUrlforLoginUser + 'applications/' + applicationId + '/unsubscribe', '')
            .map((response) => {
                return <StoreApplication>response.json();
            })
            .catch(this.logError);
    }

    checkAppIsSubscibled(applicationId: string) {
        return this.http.get(this.storeUrlforLoginUser + 'applications/' + applicationId + '/checkAppIsSubscribled');
    }

    getApplicationById(applicationId: string) {
        return this.http.get(this.storeUrl + '/applications/' + applicationId)
            .map((response) => {
                return <StoreApplication>response.json();
            })
            .catch(this.logError);
    }
}
