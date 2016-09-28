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
import {Http, Headers, Response } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import {User} from '../';

@Injectable()
export class LoginService {

    constructor(private http: Http) {}

    login() {

        // Create headers from Plain Old JavaScript Object
        let useHeaders = new Headers({
        'X-Requested-With': 'XMLHttpRequest'
        });

        return this.http.get('/user', {'headers': useHeaders})
            .map(this.extractData)
            .catch(this.logError);
    }

    logout() {
        return this.http.post('/logout', {})
            .map(response => this.extractData)
            .catch(this.logError);
    }

    private extractData(res: Response): User {
        try {
            let body = res.json();
            return body || undefined;
        } catch (err) {
            return undefined;
        }
    }

    logError(err: Response) {
        console.error('There was an error: ' + err);
        return Observable.throw(err.json().error || 'Server error');
    }
}
