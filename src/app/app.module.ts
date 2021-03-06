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
import { ENV_PROVIDERS } from './environment';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { UPLOAD_DIRECTIVES } from 'ng2-uploader/ng2-uploader';
import { MyDatePickerModule } from 'mydatepicker';

import {
  AboutComponent,
  LoginComponent,
  StoreComponent,
  StoreNavbarComponent,
  DeveloperComponent,
  StoreAppsComponent,
  ConsumerProfileComponent,
  ApplicationComponent,
  DeveloperApplicationCardComponent,
  DeveloperApplicationsComponent,
  DeveloperApplicationsBundleComponent,
  DeveloperProfileComponent,
  DeveloperApplicationComponent,
  DeveloperApplicationDetailsComponent,
  DeveloperSettingsComponent,
  DeveloperDashboardComponent,
  DeveloperNavbarComponent,
  DeveloperApplicationUpdateComponent,
  UploadComponent,
  DeveloperWelcomeComponent,
  ApplicationSubscriptionComponent,
  ApplicationRateComponent,
  ConsumerAppsComponent,
  ConsumerSubscriptionComponent,
  FeaturedAppsComponent,
  StoreApplicationDetailsComponent,
  ReviewComponent,
  StoreLandingComponent,
  StoreSearchBarComponent,
  StoreSearchViewComponent,
  StoreBrowseListComponent,
  CategoryComponent,
  DeveloperAppInstallerComponent
} from './components';
import {
  DeveloperListPipe,
  CategoryListPipe,
  ApplicationListPipe,
  FavoriteDirective,
  HideActiveAppsListPipe,
  RatingLikedDirective,
  RatingDislikedDirective,
  AppCategoryFilterPipe
} from './core';

// import {SignupModule} from './components/signup/signup.module';
import { BOCoreModule } from './core/bo-core.module';

import { routing } from './app.routing';


@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    MyDatePickerModule,
    ReactiveFormsModule,
    routing,
    BOCoreModule
  ],
  declarations: [
    UPLOAD_DIRECTIVES,
    AppComponent,
    AboutComponent,
    UploadComponent,
    StoreComponent,
    StoreNavbarComponent,
    StoreAppsComponent,
    ConsumerProfileComponent,
    ApplicationComponent,
    DeveloperComponent,
    LoginComponent,
    DeveloperApplicationCardComponent,
    DeveloperApplicationComponent,
    DeveloperApplicationDetailsComponent,
    DeveloperApplicationsComponent,
    DeveloperProfileComponent,
    DeveloperSettingsComponent,
    DeveloperDashboardComponent,
    DeveloperApplicationsBundleComponent,
    DeveloperNavbarComponent,
    DeveloperListPipe,
    CategoryListPipe,
    AppCategoryFilterPipe,
    FavoriteDirective,
    RatingLikedDirective,
    RatingDislikedDirective,
    ApplicationListPipe,
    DeveloperWelcomeComponent,
    DeveloperApplicationUpdateComponent,
    HideActiveAppsListPipe,
    ApplicationSubscriptionComponent,
    ApplicationRateComponent,
    ConsumerAppsComponent,
    ConsumerSubscriptionComponent,
    FeaturedAppsComponent,
    StoreApplicationDetailsComponent,
    ReviewComponent,
    StoreLandingComponent,
    StoreSearchBarComponent,
    StoreSearchViewComponent,
    StoreBrowseListComponent,
    CategoryComponent,
    DeveloperAppInstallerComponent
  ],
  providers: [
    ENV_PROVIDERS
  ],
  entryComponents: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
