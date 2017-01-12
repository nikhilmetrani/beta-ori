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
  inject
} from '@angular/core/testing';
import {
  Response, HttpModule
} from '@angular/http';

import { ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { User, StoreApplication, StoreService } from '../';
import { APP_TEST_HTTP_PROVIDERS } from '../../../testing';
let user: User = {
  rid: 'user7',
  username: 'App owner 1',
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
  developer: user,
  links: [],
  category: { id: 1, name: 'Development' },
  isFavorite: false
}];
let storeService: StoreService;
let mockBackend: MockBackend;

describe('StoreService Tests', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
      ],
      providers: [
        APP_TEST_HTTP_PROVIDERS,
        StoreService,
      ],
    });
  });
  beforeEach(inject([StoreService, MockBackend], (..._) => {
    [storeService, mockBackend] = _;
  }));

  it('Should get applications', done => {
    // let storeService: StoreService;

    getTestBed().compileComponents().then(() => {
      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          connection.mockRespond(new Response(
            new ResponseOptions({
              body: { applications: storeApps, status: 200 }
            }
            )));
        });

      storeService = getTestBed().get(StoreService);
      expect(storeService).toBeDefined();

      storeService.getApplications().subscribe((apps: StoreApplication[]) => {
        expect(apps[0].rid).toEqual(2);
        expect(apps[1].rid).toEqual(3);

        expect(apps[0].name).toEqual('Application 2');
        expect(apps[1].name).toEqual('Application 3');

        expect(apps[0].category.name).toEqual('Productivity');
        expect(apps[1].category.name).toEqual('Development');
        done();
      });
    });
  });

  // it('Should get applications async',
  //   async(inject([MockBackend, StoreService], (mockBackend, storeService: StoreService) => {
  //     mockBackend.connections.subscribe(
  //       (connection: MockConnection) => {
  //         connection.mockRespond(new Response(
  //           new ResponseOptions({
  //             body: { applications: storeApps, status: 200 }
  //           }
  //           )));
  //       });

  //     storeService.getApplications().subscribe(
  //       (apps: StoreApplication[]) => {
  //         expect(apps[0].rid).toEqual(2);
  //         expect(apps[1].rid).toEqual(3);

  //         expect(apps[0].name).toEqual('Application 2');
  //         expect(apps[1].name).toEqual('Application 3');

  //         expect(apps[0].category.name).toEqual('Productivity');
  //         expect(apps[1].category.name).toEqual('Development');
  //       });
  //   })));

  it('Should get applications by category', done => {
    // let storeService: StoreService;

    getTestBed().compileComponents().then(() => {
      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          connection.mockRespond(new Response(
            new ResponseOptions({
              body: { applications: [storeApps[0]], status: 200 }
            }
            )));
        });

      storeService = getTestBed().get(StoreService);
      expect(storeService).toBeDefined();

      storeService.getApplicationsByCategory('Productivity').subscribe((apps: StoreApplication[]) => {
        expect(apps.length).toEqual(1);
        expect(apps[0].rid).toEqual(2);
        expect(apps[0].name).toEqual('Application 2');
        expect(apps[0].category.name).toEqual('Productivity');
        done();
      });
    });
  });

  // it('Should get applications by category async',
  //   async(inject([MockBackend, StoreService], (mockBackend, storeService: StoreService) => {
  //     mockBackend.connections.subscribe(
  //       (connection: MockConnection) => {
  //         connection.mockRespond(new Response(
  //           new ResponseOptions({
  //             body: { applications: [storeApps[1]], status: 200 }
  //           }
  //           )));
  //       });

  //     storeService.getApplicationsByCategory('Development').subscribe(
  //       (apps: StoreApplication[]) => {
  //         expect(apps.length).toEqual(1);
  //         expect(apps[0].rid).toEqual(3);
  //         expect(apps[0].name).toEqual('Application 3');
  //         expect(apps[0].category.name).toEqual('Development');
  //       });
  //   })));

  it('Should catch error', done => {
    // let storeService: StoreService;

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
