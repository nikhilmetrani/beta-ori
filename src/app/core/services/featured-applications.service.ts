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
import { FeaturedApplication } from '../';
import { JsonHttp } from './json-http';

@Injectable()
export class FeaturedApplicationsService {
    appsUrl: string = '/api/1/store/browse/Featured';

    constructor(private http: JsonHttp) { }

    getFeaturedApplications() {
        return this.http.get(this.appsUrl)
            .map((response) => <FeaturedApplication[]>response.json().applications)
            .catch(this.logError);
    }

    logError(err: Response) {
        return Observable.throw(err.json().error || 'Server error');
    }
}
