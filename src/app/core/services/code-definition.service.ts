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
import {Code} from '../';
import {JsonHttp} from './json-http';

@Injectable()
export class CodeDefinitionService {
    codeUrl: string = '/api/1/codes/';

    constructor(private http: JsonHttp) {}

    getCategoryCodes() {
        return this.makeRequest('category');
    }

    private makeRequest(path: string) {
        let url = `${ this.codeUrl }${ path }`;
        return this.http.get(url)
            .map((response) => <Code[]> response.json().codes)
            .catch(this.logError);
    }

    logError(err: Response) {
        return Observable.throw(err.json().error || 'Server error');
    }
}
