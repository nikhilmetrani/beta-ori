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
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import {DeveloperProfile} from '../';
import {User} from '../';
import {JsonHttp} from './json-http';

@Injectable()
export class ProfileService {
    developerUrl: string = '/api/0/developer/';
    consumerUrl: string = '/api/0/user/';
    consumerPwdUrl: string = '/api/0/users/changepwd'

    constructor(private http: JsonHttp) {}

    getProfileUrl(): string {
        return this.developerUrl + 'profile';
    }

    getDeveloperProfile(developerId: string) {
        // Developer ID validation is now implemented on server side.
        return this.http.get(this.getProfileUrl());
    }

    createDeveloperProfile(developerId: string, profile: DeveloperProfile) {
        // Developer ID validation is now implemented on server side.
        return this.http.post(this.getProfileUrl(), profile);
    }

    modifyDeveloperProfile(developerId: string, profile: DeveloperProfile) {
        return this.http.post(this.getProfileUrl(), profile);
    }

    getConsumerProfileUrl(): string {
        return this.consumerUrl;
    }
    
    getConsumerProfile(consumerId: string) {
        return this.http.get(this.getConsumerProfileUrl());
    }

    getConsumerPasswordUrl(): string {
        return this.consumerPwdUrl;
    }

    getConsumerPassword(consumerId: string) {
        return this.http.get(this.getConsumerPasswordUrl());
    }

    changeUserPassword(currentPwd: string, newPwd: string) {
        return this.http.post(this.getConsumerPasswordUrl(), {'currentPwd': currentPwd, 'newPwd': newPwd});
    }

}
