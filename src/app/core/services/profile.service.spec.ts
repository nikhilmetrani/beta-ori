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

import {
  TestBed,
  inject
} from '@angular/core/testing';
import {
  Headers,
  Response, HttpModule, RequestMethod
} from '@angular/http';

import {ResponseOptions} from '@angular/http';
import {MockBackend} from '@angular/http/testing';
import {DeveloperProfile, ProfileService} from '../';

import {APP_TEST_HTTP_PROVIDERS} from '../../../testing';

let dummyProfile: DeveloperProfile = {
                        rid: 16,
                        website: 'http://localhost.com',
                        email: 'mokeduser@mocked.com',
                        description: 'Mocked user description',
                        company: 'Mocked company',
                        workPhone: '12345'
                    };

describe('ProfileService Tests', () => {
  let profileService: ProfileService;
  let mockBackend: MockBackend;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
      ],
      providers: [
        APP_TEST_HTTP_PROVIDERS,
        ProfileService,
      ],
    });
  });
  beforeEach(inject([ProfileService, MockBackend], (..._) => {
    [profileService, mockBackend] = _;
  }));

  describe('.Get Developer Profile', () => {
    it('Can get developer profile', (done) => {
      mockBackend.connections.subscribe(conn => {
        conn.mockRespond(new Response(new ResponseOptions({
          headers: new Headers({'x-auth-token': 'my jwt'}),
          body: JSON.stringify(dummyProfile),
          status: 200
        })));
        expect(conn.request.method).toEqual(RequestMethod.Get);
        expect(conn.request.url).toEqual('/api/0/developer/profile');
      });
      profileService.getDeveloperProfile('resourceid16').subscribe(res => {
        expect(res.json()).toEqual(dummyProfile);
        done();
      });
    });
  });

  describe('.Create developer profile', () => {
    it('can create developer profile', (done) => {
      mockBackend.connections.subscribe(conn => {
        conn.mockRespond(new Response(new ResponseOptions({
          headers: new Headers({'x-auth-token': 'my jwt'}),
          body: JSON.stringify(dummyProfile),
          status: 200
        })));
        expect(conn.request.method).toEqual(RequestMethod.Post);
        expect(conn.request.url).toEqual('/api/0/developer/profile');
        expect(conn.request.json()).toEqual(dummyProfile);
      });
      profileService.createDeveloperProfile('username', dummyProfile).subscribe((response: Response) => {
        expect(response).toBeDefined();
        expect(response.json()).toEqual(dummyProfile);
        expect(response.status).toBe(200);
        done();
      });
    });
  });
});
