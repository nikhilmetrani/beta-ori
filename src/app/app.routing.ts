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

import { RouterModule, Routes } from '@angular/router';

import {AboutComponent,
        LoginComponent,
        DeveloperComponent,
        ApplicationListComponent,
        DeveloperProfileCreateComponent
        } from './components';

import {AuthGuard} from './core';

const routes: Routes = [
  {path: 'store', component: ApplicationListComponent, data: {title: 'Store'}},
  {path: 'login', component: LoginComponent, data: {title: 'Login'}},
  {path: 'developer', component: DeveloperComponent, data: {title: 'Developer'}, canActivate: [AuthGuard]},
  {path: 'createdevpro', component: DeveloperProfileCreateComponent, data: {title: 'CreateDeveloperProfile'}, canActivate: [AuthGuard]},
  {path: 'about', component: AboutComponent, data: {title: 'About'}},

  // If none of the routes match, go to store.
  {path: '**', redirectTo: 'store'}
];

export const routing = RouterModule.forRoot(routes, { useHash: true });
