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
        DeveloperApplicationComponent,
        DeveloperApplicationsComponent,
        DeveloperApplicationsBundleComponent,
        DeveloperProfileComponent,
        DeveloperSettingsComponent
        } from './components';

import {AuthGuard} from './core';

const routes: Routes = [
  {path: '', component: DeveloperComponent, data: {title: 'Developer'},
    children: [
      {path: 'login', component: LoginComponent},
      {path: 'apps', component: DeveloperApplicationsComponent, canActivate: [AuthGuard]},
      {path: 'apps/app', component: DeveloperApplicationComponent, data: { action: 'view' }, canActivate: [AuthGuard]},
      {path: 'apps/create', component: DeveloperApplicationComponent, data: { action: 'create' }, canActivate: [AuthGuard]},
      {path: 'bundle/create', component: DeveloperApplicationsBundleComponent, data: { action: 'create' }, canActivate: [AuthGuard]},
      {path: 'profile', component: DeveloperProfileComponent, data: { action: 'view' }, canActivate: [AuthGuard]},
      {path: 'settings', component: DeveloperSettingsComponent, canActivate: [AuthGuard]},
      {path: 'about', component: AboutComponent, data: {title: 'About'}},

      { path: '**', redirectTo: 'apps'}
    ]
  },

  // If none of the routes match, go to store.
  {path: '**', redirectTo: ''}
];

export const routing = RouterModule.forRoot(routes, { useHash: true });
