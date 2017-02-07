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

import {inject,
    TestBed,
    fakeAsync,
    ComponentFixture
  } from '@angular/core/testing';
import {Location} from '@angular/common';
import {Component, DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser/src/dom/debug/by';
import {RouterTestingModule} from '@angular/router/testing';
import {APP_TEST_HTTP_PROVIDERS} from '../../../testing';

import {AboutComponent} from '../';

describe('AboutComponent', () => {
  @Component({
    template: `<bo-about></bo-about><router-outlet></router-outlet>`,
  })
  class TestComponent {
  }
  @Component({
    template: ``,
  })
  class BlankComponent {
  }
  let location: Location;
  let fixture: ComponentFixture<any>;
  let cmpDebugElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: 'home',
            component: BlankComponent,
          },
        ])
      ],
      providers: [
        APP_TEST_HTTP_PROVIDERS,
      ],
      declarations: [
        AboutComponent,
        TestComponent,
        BlankComponent,
      ]
    });
  });
  beforeEach(inject([Location], (..._) => {
    [location] = _;
  }));
  beforeEach(fakeAsync(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      cmpDebugElement = fixture.debugElement.query(By.directive(AboutComponent));
    });
  }));

  it('.When Open', () => {
    describe('can be shown', () => {
      expect(cmpDebugElement).toBeTruthy();
    });
  });
});
