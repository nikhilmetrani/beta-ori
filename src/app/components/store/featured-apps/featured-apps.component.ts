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

import { Component, OnInit } from '@angular/core';
import { FeaturedApplicationsService } from '../../../core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { FeaturedApplication } from '../../../core';

@Component({
  selector: 'bo-featured-apps',
  styleUrls: ['./featured-apps.component.css'],
  templateUrl: './featured-apps.component.html',
})
export class FeaturedAppsComponent implements OnInit {
  featureItems: Observable<any>;
  featureItemsArray: FeaturedApplication[] = [];

  constructor(public featureAppService: FeaturedApplicationsService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.featureItems = this.featureAppService.getFeaturedApplications();
      this.featureItems.subscribe(next => this.featureItemsArray = next);
    });
  }
  viewApplicationDetails(rid) {
    localStorage.setItem('rid', rid);
  }
}
