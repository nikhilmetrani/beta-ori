import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import {User} from '../entities/user';
import {objToSearchParams} from './helpers';
import {PageRequest, Page, NewUserParams} from '../dto';
import {JsonHttp} from './json-http';

const url = '/user';
const defaultPageRequest: PageRequest = {page: 1, size: 5};

@Injectable()
export class UserService {

  constructor(private http: JsonHttp) {
  }

  list(pageRequest: PageRequest = defaultPageRequest): Observable<Page<User>> {
    return this.http.get(url, {search: objToSearchParams(pageRequest)})
      .map(res => res.json())
      ;
  }

  get(id: string|number): Observable<User> {
    return this.http.get(`${url}/${id}`)
      .map(res => res.json())
      ;
  }

  create(params: NewUserParams): Observable<Response> {
    return this.http.post(url + '/create', params);
  }

  updateMe(userParam: NewUserParams): Observable<Response> {
    return this.http.patch(`${url}/me`, userParam)
      .do(resp => {
        localStorage.setItem('jwt', resp.headers.get('x-auth-token'));
      });
  }
}
