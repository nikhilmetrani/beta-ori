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
import {User, LoginService} from '../';

class MockRouter {
    navigate = jasmine.createSpy('navigate');
  }

describe('Login Service', () => {
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
});
