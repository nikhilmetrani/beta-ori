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
  getTestBed,
  async,
  inject
} from '@angular/core/testing';
import {
  Response, HttpModule, RequestMethod
} from '@angular/http';

import {ResponseOptions} from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';
import {DeveloperProfile, ProfileService} from '../';

import {APP_TEST_HTTP_PROVIDERS} from '../../../testing';

class MockRouter {
    navigate = jasmine.createSpy('navigate');
  }

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

  it('Should get developer profile', done => {
    let profileService: ProfileService;

    getTestBed().compileComponents().then(() => {
      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          connection.mockRespond(new Response(
            new ResponseOptions({
                body: {
                        rid: 'resourceid16',
                        website: 'http://localhost.com',
                        email: 'mokeduser@mocked.com',
                        description: 'Mocked user description',
                        company: 'Mocked company'
                    }
              }
            )));
        });

        profileService = getTestBed().get(ProfileService);
        expect(profileService).toBeDefined();

        profileService.getDeveloperProfile('resourceid16').subscribe((devProfile: DeveloperProfile) => {
            expect(devProfile).toBeDefined();
            expect(devProfile.rid).toEqual('resourceid16');
            expect(devProfile.website).toEqual('http://localhost.com');
            expect(devProfile.email).toEqual('mokeduser@mocked.com');
            expect(devProfile.description).toEqual('Mocked user description');
            expect(devProfile.company).toEqual('Mocked company');
            done();
        });
    });
  });

  it('Should get developer profile async',
    async(inject([MockBackend, ProfileService], (mockBackend: MockBackend, profileService: ProfileService) => {
      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          connection.mockRespond(new Response(
            new ResponseOptions({
                body: {
                        rid: 'resourceid16',
                        website: 'http://localhost.com',
                        email: 'mokeduser@mocked.com',
                        description: 'Mocked user description',
                        company: 'Mocked company'
                    }
              }
            )));
        });

      profileService.getDeveloperProfile('resourceid16').subscribe(
        (devProfile: DeveloperProfile) => {
            expect(devProfile).toBeDefined();
            expect(devProfile.rid).toBe('resourceid16');
            expect(devProfile.website).toBe('http://localhost.com');
            expect(devProfile.email).toBe('mokeduser@mocked.com');
            expect(devProfile.description).toBe('Mocked user description');
            expect(devProfile.company).toBe('Mocked company');
      });
    })));

    it('Should create developer profile',
        async(inject([MockBackend, ProfileService], (mockBackend: MockBackend, profileService: ProfileService) => {
        mockBackend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.method).toBe(RequestMethod.Post);
            connection.mockRespond(new Response(new ResponseOptions({status: 200})));
        });

        let developerProfile: DeveloperProfile = {
                        rid: 16,
                        website: 'http://localhost.com',
                        email: 'mokeduser@mocked.com',
                        description: 'Mocked user description',
                        company: 'Mocked company'
                    };
        profileService.createDeveloperProfile('resourceid16', developerProfile).subscribe(
            (successResult) => {
                expect(successResult).toBeDefined();
                expect(successResult.status).toBe(200);
            });
    })));
});
