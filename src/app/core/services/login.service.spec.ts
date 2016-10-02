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
  Response, HttpModule, Http, XHRBackend, RequestMethod
} from '@angular/http';

import {ResponseOptions} from '@angular/http';
import {Router} from '@angular/router';
import {MockBackend, MockConnection} from '@angular/http/testing';
import {User, LoginService} from '../';

class MockRouter {
    navigate = jasmine.createSpy('navigate');
  }

describe('LoginService Tests', () => {
  let mockBackend: MockBackend;
  const mockRouter = new MockRouter();
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        LoginService,
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

  it('Should get user', done => {
    let loginService: LoginService;

    getTestBed().compileComponents().then(() => {
      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          connection.mockRespond(new Response(
            new ResponseOptions({
                body: {
                        rid: 16,
                        name: 'Mocked User'
                    }
              }
            )));
        });

        loginService = getTestBed().get(LoginService);
        expect(loginService).toBeDefined();

        loginService.getUserDetails().subscribe((user: User) => {
            expect(user.rid).toEqual(16);
            expect(user.name).toEqual('Mocked User');
            done();
        });
    });
  });

  it('should get user async',
    async(inject([MockBackend, LoginService], (mockBackend, loginService) => {
      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          connection.mockRespond(new Response(
            new ResponseOptions({
                body: {
                        rid: 16,
                        name: 'Mocked User'
                    }
              }
            )));
        });

      loginService.getUserDetails().subscribe(
        (user: User) => {
            expect(user.rid).toEqual(16);
            expect(user.name).toEqual('Mocked User');
      });
    })));

    it('Should perform logout',
        async(inject([MockBackend, LoginService], (mockBackend: MockBackend, loginService: LoginService) => {
        mockBackend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.method).toBe(RequestMethod.Post);
            connection.mockRespond(new Response(new ResponseOptions({status: 200})));
        });

        loginService.logout().subscribe(
            (successResult) => {
                expect(successResult).toBeDefined();
                expect(successResult.status).toBe(200);
            });
    })));
});
