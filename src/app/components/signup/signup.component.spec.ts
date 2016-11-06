import {Component, DebugElement} from '@angular/core';
import {Location} from '@angular/common';
import {By} from '@angular/platform-browser/src/dom/debug/by';
import {
  inject,
  fakeAsync,
  TestBed,
  ComponentFixture
} from '@angular/core/testing';
import {BaseResponseOptions, Response} from '@angular/http';
import {MockBackend} from '@angular/http/testing';
import {Router} from '@angular/router';
import {SignupComponent} from './signup.component';
import {RouterTestingModule} from '@angular/router/testing';
import {LoginService} from '../../core/services/login.service';
import {BOCoreModule} from '../../core';
import {SignupModule} from './signup.module';
import {APP_TEST_HTTP_PROVIDERS, advance} from '../../../testing';

describe('SignupComponent', () => {

  @Component({
    template: `<bo-signup></bo-signup><router-outlet></router-outlet>`,
  })
  class TestComponent {
  }

  @Component({
    template: ``,
  })
  class BlankComponent {
  }

  let fixture: ComponentFixture<any>;
  let cmpDebugElement: DebugElement;

  let loginService: LoginService;
  let backend: MockBackend;
  let router: Router;
  let location: Location;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: 'home',
            component: BlankComponent,
          },
        ]),
        BOCoreModule,
        SignupModule,
      ],
      providers: [
        APP_TEST_HTTP_PROVIDERS,
      ],
      declarations: [
        TestComponent,
        BlankComponent,
      ]
    });
  });
  beforeEach(inject([LoginService, MockBackend, Router, Location], (..._) => {
    [loginService, backend, router, location] = _;
  }));
  beforeEach(fakeAsync(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      cmpDebugElement = fixture.debugElement.query(By.directive(SignupComponent));
    });
  }));

  describe('.When open', () => {
    it('can be shown', () => {
      expect(cmpDebugElement).toBeTruthy();
    });
  });

  describe('.When dirty', () => {
    it('can validate inputs', () => {
      const page: SignupComponent = cmpDebugElement.componentInstance;
      page.email.setValue('b', {});
      page.password.setValue('c', {});
      page.passwordConfirmation.setValue('d', {});
      expect(page.myForm.valid).toBeFalsy();
      page.email.setValue('test@test.com', {});
      page.password.setValue('secret123', {});
      page.passwordConfirmation.setValue('secret123', {});
      expect(page.myForm.valid).toBeTruthy();
    });
  });

  describe('.When submitted', () => {
    it('can signup', fakeAsync(() => {
      const page: SignupComponent = cmpDebugElement.componentInstance;
      spyOn(loginService, 'login').and.callThrough();
      backend.connections.subscribe(conn => {
        conn.mockRespond(new Response(new BaseResponseOptions()));
      });
      page.onSubmit({
        email: 'test@test.com',
        password: 'secret',
      });
      expect(loginService.login).toHaveBeenCalledWith('test@test.com', 'secret');
      advance(fixture);
      expect(location.path()).toEqual('/');
    }));
  });

});
