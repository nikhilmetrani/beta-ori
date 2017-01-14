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

import {CommonModule} from '@angular/common';
import { NgModule } from '@angular/core';
import {SkipSelf, Optional} from '@angular/core';
import {XHRBackend, Http, RequestOptions, HttpModule} from '@angular/http';

// Import services
import {JsonHttp} from './services/json-http';
import {HttpErrorHandler} from './services/http-error-handler';
import {LoginService} from './services/login.service';
import {UserService} from './services/user.service';
import {StoreService} from './services/store.service';
import {ProfileService} from './services/profile.service';
import {DeveloperReportsService} from './services/developer-reports.service';
import {DeveloperApplicationsService} from './services/developer-applications.service';
import {DeveloperApplicationsBundleService} from './services/developer-app-bundle.service';
import {UserInfoResolver} from './services/user-info.resolver';
import {ConsumerProfileDataResolver} from './services/consumer-profile-data.resolver';
import {DeveloperProfileDataResolver} from './services/developer-profile-data.resolver';
import {SubscriptionService} from './services/subscription.service';

// Import guards
import {PublicPageGuard} from './guards/public-page.guard';
import {PrivatePageGuard} from './guards/private-page.guard';


export function createJsonHttp(xhrBackend: XHRBackend, requestOptions: RequestOptions) {
  const ngHttp = new Http(xhrBackend, requestOptions);
  return new JsonHttp(ngHttp);
}

@NgModule({
  imports: [
    CommonModule,
    HttpModule
  ],
  exports: [],
  declarations: [
    // DeveloperListPipe,
    // CategoryListPipe,
    // FavoriteDirective
  ],
  providers: [
    {
      provide: JsonHttp,
      useFactory: createJsonHttp,
      deps: [XHRBackend, RequestOptions]
    },
    HttpErrorHandler,
    LoginService,
    UserService,
    PublicPageGuard,
    PrivatePageGuard,
    StoreService,
    ProfileService,
    DeveloperReportsService,
    DeveloperApplicationsService,
    DeveloperApplicationsBundleService,
    UserInfoResolver,
    ConsumerProfileDataResolver,
    DeveloperProfileDataResolver,
    SubscriptionService
  ]
})
export class BOCoreModule {
  constructor(@Optional() @SkipSelf() parentModule: BOCoreModule) {
    if (parentModule) {
      throw new Error(
        'BOCoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
