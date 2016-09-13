/**
* Copyright 2016 - 29cu.io and the authors of alpha-umi open source project

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

import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from "@angular/http";

import {AppComponent} from "./app.component";
import {AboutComponent} from "./about/components/about.components";
import {LoginComponent} from "./login/login.component";
import {LoginService} from "./login/login.service";

import {DeveloperListPipe} from './store/shared/developer-list.pipe';
import {CategoryListPipe} from './store/shared/category-list.pipe';
import {FavoriteDirective} from './store/shared/favorite.directive';
import {ApplicationList, Application, StoreService} from './store/index';

import {routing, appRoutingProviders} from './app.routes';
import {FormsModule} from "@angular/forms";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        routing,
        HttpModule
    ],
    declarations: [
        AppComponent,
        DeveloperListPipe,
        CategoryListPipe,
        ApplicationList,
        FavoriteDirective,
        Application,
        AboutComponent,
        LoginComponent
    ],
    providers: [
        appRoutingProviders,
        LoginService,
        StoreService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}