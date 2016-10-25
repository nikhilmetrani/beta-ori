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

import {inject, TestBed} from '@angular/core/testing';
import {
  Headers,
  ResponseOptions,
  Response,
  RequestMethod,
  HttpModule
} from '@angular/http';
import {MockBackend} from '@angular/http/testing';
import {LoginService} from './login.service';
import {APP_TEST_HTTP_PROVIDERS} from '../../../testing';

describe('LoginService', () => {

  let loginService: LoginService;
  let backend: MockBackend;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
      ],
      providers: [
        APP_TEST_HTTP_PROVIDERS,
        LoginService,
      ],
    });
  });
  beforeEach(inject([LoginService, MockBackend], (..._) => {
    [loginService, backend] = _;
  }));

  describe('.login', () => {
    it('can login', (done) => {
      backend.connections.subscribe(conn => {
        conn.mockRespond(new Response(new ResponseOptions({
          headers: new Headers({'x-auth-token': 'my jwt'}),
        })));
        expect(conn.request.method).toEqual(RequestMethod.Post);
        expect(conn.request.url).toEqual('/api/1/login');
        expect(conn.request.json()).toEqual({
          username: 'username',
          password: 'secret',
        });
      });
      loginService.login('username', 'secret').subscribe(() => {
        expect(localStorage.getItem('jwt')).toEqual('my jwt');
        done();
      });
    });
  }); // .login

  describe('.logout', () => {
    it('can logout', () => {
      localStorage.setItem('jwt', 'my jwt');
      loginService.logout();
      expect(localStorage.getItem('jwt')).toBeFalsy();
    });
  }); // .logout

  describe('.isSignedIn', () => {
    describe('when not signed in', () => {
      it('should be false', () => {
        expect(loginService.isSignedIn()).toBeFalsy();
      });
    });

    describe('when signed in', () => {
      beforeEach(() => localStorage.setItem('jwt', 'dummy'));
      it('should be true', () => {
        expect(loginService.isSignedIn()).toBeTruthy();
      });
    });
  }); // .isSignedIn

});
