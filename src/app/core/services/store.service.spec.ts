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
  BaseRequestOptions,
  Response, HttpModule, Http, XHRBackend
} from '@angular/http';

import {ResponseOptions} from '@angular/http';
import {Router} from '@angular/router';
import {MockBackend, MockConnection} from '@angular/http/testing';
import {User, StoreApplication, StoreService} from '../';

class MockRouter {
    navigate = jasmine.createSpy('navigate');
  }

let user: User = {rid: 7, name: 'App owner'};
let storeApps: StoreApplication[] = [{
                    rid: 2,
                    name: 'Application 2',
                    developer: user,
                    links: [],
                    category: 'Productivity',
                    isFavorite: false
                },
                {
                    rid: 3,
                    name: 'Application 3',
                    developer: user,
                    links: [],
                    category: 'Development',
                    isFavorite: false
                }];

describe('StoreService Tests', () => {
  let mockBackend: MockBackend;
  const mockRouter = new MockRouter();
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        StoreService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          deps: [MockBackend, BaseRequestOptions],
          useFactory:
            (backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
              return new Http(backend, defaultOptions);
            }
       },
       {provide: Router, useValue: mockRouter}
      ],
      imports: [
        HttpModule
      ]
    });
    mockBackend = getTestBed().get(MockBackend);
  }));

  it('Should get applications', done => {
    let storeService: StoreService;

    getTestBed().compileComponents().then(() => {
      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          connection.mockRespond(new Response(
            new ResponseOptions({
                body: { applications: storeApps, status: 200}}
            )));
        });

        storeService = getTestBed().get(StoreService);
        expect(storeService).toBeDefined();

        storeService.getApplications().subscribe((apps: StoreApplication[]) => {
            expect(apps[0].rid).toEqual(2);
            expect(apps[1].rid).toEqual(3);

            expect(apps[0].name).toEqual('Application 2');
            expect(apps[1].name).toEqual('Application 3');

            expect(apps[0].category).toEqual('Productivity');
            expect(apps[1].category).toEqual('Development');
            done();
        });
    });
  });

  it('Should get applications async',
    async(inject([MockBackend, StoreService], (mockBackend, storeService: StoreService) => {
      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          connection.mockRespond(new Response(
            new ResponseOptions({
                body: { applications: storeApps, status: 200}}
            )));
        });

      storeService.getApplications().subscribe(
        (apps: StoreApplication[]) => {
            expect(apps[0].rid).toEqual(2);
            expect(apps[1].rid).toEqual(3);

            expect(apps[0].name).toEqual('Application 2');
            expect(apps[1].name).toEqual('Application 3');

            expect(apps[0].category).toEqual('Productivity');
            expect(apps[1].category).toEqual('Development');
      });
    })));

    it('Should get applications by category', done => {
    let storeService: StoreService;

    getTestBed().compileComponents().then(() => {
      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          connection.mockRespond(new Response(
            new ResponseOptions({
                body: { applications: [storeApps[0]], status: 200}}
            )));
        });

        storeService = getTestBed().get(StoreService);
        expect(storeService).toBeDefined();

        storeService.getApplicationsByCategory('Productivity').subscribe((apps: StoreApplication[]) => {
            expect(apps.length).toEqual(1);
            expect(apps[0].rid).toEqual(2);
            expect(apps[0].name).toEqual('Application 2');
            expect(apps[0].category).toEqual('Productivity');
            done();
        });
    });
  });

  it('Should get applications by category async',
    async(inject([MockBackend, StoreService], (mockBackend, storeService: StoreService) => {
      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          connection.mockRespond(new Response(
            new ResponseOptions({
                body: { applications: [storeApps[1]], status: 200}}
            )));
        });

      storeService.getApplicationsByCategory('Development').subscribe(
        (apps: StoreApplication[]) => {
            expect(apps.length).toEqual(1);
            expect(apps[0].rid).toEqual(3);
            expect(apps[0].name).toEqual('Application 3');
            expect(apps[0].category).toEqual('Development');
      });
    })));

    it('Should catch error', done => {
        let storeService: StoreService;

        getTestBed().compileComponents().then(() => {
        mockBackend.connections.subscribe(
            (connection: MockConnection) => {
            connection.mockRespond(new Response(
                new ResponseOptions({ body: undefined }
                )));
            });

            storeService = getTestBed().get(StoreService);
            expect(storeService).toBeDefined();

            try {
                storeService.getApplications().subscribe(
                    (response) => {
                        fail();
                });
            } catch (ex) {
                done();
            }
        });
    });
});
