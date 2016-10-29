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

import {DeveloperListPipe, StoreApplication, User} from '../';
let user: User = {rid: 'user7',
                    username: 'App owner 1',
                    firstname: 'first',
                    lastname: 'last',
                    authorities: ['ROLE_USER', 'ROLE_DEVELOPER'],
                    email: 'user7@email.com',
                    enabled: true
                };
let user2: User = {rid: 'user8',
                    username: 'App owner 2',
                    firstname: 'first',
                    lastname: 'last',
                    authorities: ['ROLE_USER', 'ROLE_DEVELOPER'],
                    email: 'user7@email.com',
                    enabled: true
                };
let storeApps: StoreApplication[] = [{
                    rid: 2,
                    name: 'Application 2',
                    developer: user,
                    links: [],
                    category: { id: 1, name: 'Productivity' },
                    isFavorite: false
                },
                {
                    rid: 3,
                    name: 'Application 3',
                    developer: user2,
                    links: [],
                    category: { id: 1, name: 'Development' },
                    isFavorite: false
                }];

describe('DeveloperListPipe Tests', () => {
    let pipe: DeveloperListPipe;

    beforeEach(() => {
        pipe = new DeveloperListPipe();
    });

    it('Should return comma separated string of developer names', () => {
        let result = pipe.transform(storeApps);
        expect(result).toEqual(storeApps[0].developer.username + ', ' + storeApps[1].developer.username);
    });
});
