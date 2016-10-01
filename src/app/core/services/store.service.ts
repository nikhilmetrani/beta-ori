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
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import {StoreApplication} from '../';

@Injectable()
export class StoreService {
    storeUrl: string = '/store/';

    constructor(private http: Http) {}

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
}
