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
import {DeveloperProfile, ProfileService} from '../';

class MockRouter {
    navigate = jasmine.createSpy('navigate');
  }

describe('Profile Service', () => {
  let mockBackend: MockBackend;
  const mockRouter = new MockRouter();
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        ProfileService,
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

  it('Should get developer profile', done => {
    let profileService: ProfileService;

    getTestBed().compileComponents().then(() => {
      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          connection.mockRespond(new Response(
            new ResponseOptions({
                body: {
                        rid: 16,
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

        profileService.getDeveloperProfile(16).subscribe((devProfile: DeveloperProfile) => {
            expect(devProfile).toBeDefined();
            expect(devProfile.rid).toEqual(16);
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
                        rid: 16,
                        website: 'http://localhost.com',
                        email: 'mokeduser@mocked.com',
                        description: 'Mocked user description',
                        company: 'Mocked company'
                    }
              }
            )));
        });

      profileService.getDeveloperProfile(16).subscribe(
        (devProfile: DeveloperProfile) => {
            expect(devProfile).toBeDefined();
            expect(devProfile.rid).toBe(16);
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
        profileService.createDeveloperProfile(16, developerProfile).subscribe(
            (successResult) => {
                expect(successResult).toBeDefined();
                expect(successResult.status).toBe(200);
            });
    })));
});
