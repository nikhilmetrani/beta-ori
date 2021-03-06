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

import {Component, OnInit} from '@angular/core';
import {SubscriptionService} from '../../../core';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute} from '@angular/router';
import {StoreApplication} from '../../../core';

@Component({
  selector: 'bo-consumer-apps',
  styleUrls: ['./consumer-apps.component.css'],
  templateUrl: './consumer-apps.component.html',
})
export class ConsumerAppsComponent implements OnInit {
  subscriptions: Observable<any>;
  subscribedApps: StoreApplication[] = [];
  // subscribedApps: any = [];

  constructor(public subscriptionService: SubscriptionService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.subscriptions = this.subscriptionService.getConsumerSubscriptions();
    this.subscriptions.subscribe(apps => {
      this.subscribedApps = apps.json().applications;
    });
  }
}
