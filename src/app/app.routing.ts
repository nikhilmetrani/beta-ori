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
        StoreComponent,
        StoreAppsComponent,
        DeveloperComponent,
        DeveloperApplicationComponent,
        DeveloperApplicationDetailsComponent,
        DeveloperApplicationsComponent,
        DeveloperApplicationsBundleComponent,
        DeveloperProfileComponent,
        DeveloperSettingsComponent,
        DeveloperDashboardComponent,
        DeveloperApplicationUpdateComponent,
        ApplicationRateComponent,
        ConsumerAppsComponent,
        ConsumerProfileComponent,
        ApplicationSubscriptionComponent,
        StoreApplicationDetailsComponent
        } from './components';

import { PublicPageGuard, PrivatePageGuard, DeveloperProfileDataResolver, ConsumerProfileDataResolver} from './core';

const routes: Routes = [
  {
    path: 'developer',
    component: DeveloperComponent,
    children: [
      {
        path: '',
        component: DeveloperApplicationsComponent,
        canActivate: [PrivatePageGuard]
      },
      { path: 'app',
        component: DeveloperApplicationComponent,
        data: { action: 'view' },
        canActivate: [PrivatePageGuard]
      },
      {
        path: 'create',
        component: DeveloperApplicationComponent,
        data: { action: 'create' },
        canActivate: [PrivatePageGuard]
      },
      {
        path: 'details',
        component: DeveloperApplicationDetailsComponent,
        data: { action: 'details' },
        canActivate: [PrivatePageGuard]
      },
      {
        path: 'update',
        component: DeveloperApplicationUpdateComponent,
        data: { action: 'create' },
        canActivate: [PrivatePageGuard]},

      {
        path: 'bundle/create',
        component: DeveloperApplicationsBundleComponent,
        data: { action: 'create' },
        canActivate: [PrivatePageGuard]
      },
      {
        path: 'store/sub',
        component: ApplicationSubscriptionComponent,
        data: { action: 'sub' },
        canActivate: [PrivatePageGuard]
      },
      {
        path: 'store/rate',
        component: ApplicationRateComponent,
        data: { action: 'rate' },
        canActivate: [PrivatePageGuard]
      },
      {
        path: 'profile',
        component: DeveloperProfileComponent,
        resolve: {profile: DeveloperProfileDataResolver},
        canActivate: [PrivatePageGuard]
      },
      {
        path: 'settings',
        component: DeveloperSettingsComponent,
        canActivate: [PrivatePageGuard]
      },
      {
        path: 'dashboard',
        component: DeveloperDashboardComponent,
        canActivate: [PrivatePageGuard]
      },

      { path: '**', redirectTo: ''}
    ]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [PublicPageGuard]
  },
  {
    path: 'signup',
    loadChildren: './components/signup/signup.module#SignupModule',
    canActivate: [PublicPageGuard]
  },
  {
    path: 'about',
    component: AboutComponent,
    data: {title: 'About'}
  },
  {
    path: 'store',
    component: StoreComponent,
    children: [
      {
        path: '',
        component: StoreAppsComponent
      },
      {
        path: 'profile',
        component: ConsumerProfileComponent,
        resolve: {profile: ConsumerProfileDataResolver},
        canActivate: [PrivatePageGuard]
      },
      {
        path: 'myapps',
        component: ConsumerAppsComponent,
        canActivate: [PrivatePageGuard]
      },
      {
        path: 'app/details',
        component: StoreApplicationDetailsComponent,
        data: { action: 'details' },
        canActivate: [PrivatePageGuard]
      },
      { path: '**', redirectTo: ''}
    ]
  },

  // If none of the routes match, go to store.
  {path: '**', redirectTo: 'store'}
];

export const routing = RouterModule.forRoot(routes, { useHash: true });
