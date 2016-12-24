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

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ENV_PROVIDERS} from './environment';
import { AppComponent } from './app.component';
import { UPLOAD_DIRECTIVES } from 'ng2-uploader/ng2-uploader';
import {
            AboutComponent,
            LoginComponent,
            DeveloperComponent,
            ApplicationListComponent,
            ApplicationComponent,
            DeveloperApplicationCardComponent,
            DeveloperApplicationsComponent,
            DeveloperApplicationsBundleComponent,
            DeveloperProfileComponent,
            DeveloperApplicationComponent,
            DeveloperSettingsComponent,
            DeveloperNavbarComponent,
            DeveloperApplicationUpdateComponent,
            UploadComponent
        } from './components';
import {
            DeveloperListPipe,
            CategoryListPipe,
            ApplicationListPipe,
            FavoriteDirective,
        } from './core';

// import {SignupModule} from './components/signup/signup.module';
import {BOCoreModule} from './core/bo-core.module';

import { routing } from './app.routing';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    routing,
    BOCoreModule
  ],
  declarations: [
    UPLOAD_DIRECTIVES,
    UploadComponent,
    AppComponent,
    AboutComponent,
    ApplicationListComponent,
    ApplicationComponent,
    DeveloperComponent,
    LoginComponent,
    DeveloperApplicationCardComponent,
    DeveloperApplicationComponent,
    DeveloperApplicationsComponent,
    DeveloperProfileComponent,
    DeveloperSettingsComponent,
    DeveloperApplicationsBundleComponent,
    DeveloperNavbarComponent,
    DeveloperListPipe,
    CategoryListPipe,
    FavoriteDirective,
    ApplicationListPipe,
    DeveloperApplicationUpdateComponent
  ],
  providers: [
    ENV_PROVIDERS
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
