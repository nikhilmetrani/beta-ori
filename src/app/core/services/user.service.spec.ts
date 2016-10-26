import {inject, TestBed} from '@angular/core/testing';
import {
  ResponseOptions,
  Response,
  BaseResponseOptions,
  RequestMethod,
  HttpModule
} from '@angular/http';
import {MockBackend} from '@angular/http/testing';
import {UserService} from './user.service';
import {NewUserParams} from '../dto';
import {APP_TEST_HTTP_PROVIDERS} from '../../../testing';

const dummyListJson = [
  {
    id: 1,
    content: 'content1',
    createdAt: 0,
    user: {
      id: 1,
      email: 'test1@test.com',
      name: 'test user1'
    },
  },
  {
    id: 2,
    content: 'content2',
    createdAt: 1234567,
    user: {
      id: 1,
      email: 'test1@test.com',
      name: 'test user1'
    },
  },
];

const dummyGetJson = {
  user: {
    id: 1,
    email: 'test1@test.com',
    name: 'test1',
    userStats: {
      micropostCnt: 1,
      followingCnt: 2,
      followerCnt: 3,
    },
  },
};

describe('UserService', () => {

  let userService: UserService;
  let backend: MockBackend;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
      ],
      providers: [
        APP_TEST_HTTP_PROVIDERS,
        UserService,
      ],
    });
  });
  beforeEach(inject([UserService, MockBackend], (..._) => {
    [userService, backend] = _;
  }));

  describe('.list', () => {
    it('list users', (done) => {
      backend.connections.subscribe(conn => {
        conn.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(dummyListJson),
        })));
        expect(conn.request.method).toEqual(RequestMethod.Get);
        expect(conn.request.url).toEqual('/api?page=1&size=5');
      });
      userService.list().subscribe(res => {
        expect(res).toEqual(dummyListJson);
        done();
      });
    });
  }); // .list

  describe('.get', () => {
    it('get user', (done) => {
      backend.connections.subscribe(conn => {
        conn.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(dummyGetJson),
        })));
        expect(conn.request.method).toEqual(RequestMethod.Get);
        expect(conn.request.url).toEqual('/api/0/1');
      });
      userService.get(1).subscribe(res => {
        expect(res).toEqual(dummyGetJson);
        done();
      });
    });
  }); // .get

  describe('.create', () => {
    it('create user', (done) => {
      const params: NewUserParams = {
        email: 'test1@test.com',
        password: 'secret',
        username: 'test1',
      };
      backend.connections.subscribe(conn => {
        conn.mockRespond(new Response(new BaseResponseOptions()));
        expect(conn.request.method).toEqual(RequestMethod.Post);
        expect(conn.request.url).toEqual('/api/1/signup');
        expect(conn.request.json()).toEqual(params);
      });
      userService.create(params).subscribe(() => {
        done();
      });
    });
  }); // .create

  describe('.updateMe', () => {
    it('update me', (done) => {
      const params: NewUserParams = {
        email: 'test1@test.com',
        password: 'secret',
        username: 'test1',
      };
      backend.connections.subscribe(conn => {
        conn.mockRespond(new Response(new BaseResponseOptions()));
        expect(conn.request.method).toEqual(RequestMethod.Patch);
        expect(conn.request.url).toEqual('/api/me');
        expect(conn.request.json()).toEqual(params);
      });
      userService.updateMe(params).subscribe(() => {
        done();
      });
    });
  }); // .updateMe

});
