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

import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from "@angular/http";

import {AppComponent} from "./app.component";
import {
            AboutComponent,
            LoginComponent,
            DeveloperComponent,
            ApplicationList,
            Application,
            DeveloperWelcomeComponent,
            DeveloperProfileCreateComponent
        } from "./components/exports";
import {
            LoginService,
            DeveloperListPipe,
            CategoryListPipe,
            FavoriteDirective,
            StoreService,
            ProfileService
        } from "./core/exports";

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
        DeveloperComponent,
        LoginComponent,
        DeveloperWelcomeComponent,
        DeveloperProfileCreateComponent
    ],
    providers: [
        appRoutingProviders,
        LoginService,
        StoreService,
        ProfileService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}