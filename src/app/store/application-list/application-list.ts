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

import {Component, OnInit} from '@angular/core';
import {StoreService} from '../shared/store.service';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute} from '@angular/router';
import {StoreApplication, Link, User} from "../entities";

@Component({
  selector: 'application-list',
  styleUrls: ['./app/store/application-list/application-list.css'],
  templateUrl: './app/store/application-list/application-list.html',
})
export class ApplicationList implements OnInit {
  category: string = 'All';
  storeItems: Observable<any>;
  storeItemsArray = [];

  constructor(public storeService: StoreService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.category = params['category'];
      if (this.category && this.category !== "All") {
        this.storeItems = this.storeService.getApplicationsByCategory(this.category);
      } else {
        this.category = 'All';
        this.storeItems = this.storeService.getApplications();
      }
      this.storeItems.forEach(next => this.storeItemsArray = next);
    });
  }
}
