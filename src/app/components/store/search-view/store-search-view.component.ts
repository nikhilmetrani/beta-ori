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
import { StoreService } from '../../../core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { StoreApplication } from '../../../core';

@Component({
  selector: 'bo-store-search-view',
  styleUrls: ['./store-search-view.component.css'],
  templateUrl: './store-search-view.component.html',
})
export class StoreSearchViewComponent implements OnInit {
  storeItems: Observable<any>;
  storeItemsArray: StoreApplication[] = [];
  isAuthenticated: boolean = false;
  query: string = '';
  errorMessage: string = '';
  category: string = undefined;

  constructor(public storeService: StoreService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      let queryParams = params['q'];
      this.query = queryParams;
      if (queryParams) {
        this.storeItems = this.storeService.searchApplications(queryParams);
      }
    });
    this.storeItems.subscribe(next => {
      this.storeItemsArray = next;
      if (this.storeItemsArray.length === 0) {
        this.errorMessage = 'Could not find any applications for the search - ' + this.query;
      } else {
        this.errorMessage = undefined;
      }
    },
      error => {
        this.errorMessage = 'Could not find any applications for the search - ' + this.query;
      });
  }

  selectCategory(category) {
    if (category.value === 'all') {
      this.category = undefined;
      return;
    }
    this.category = category.value;
  }
}
