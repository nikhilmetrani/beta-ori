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
import {StoreService} from '../../../core';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute} from '@angular/router';
import {StoreApplication, Category} from '../../../core';

@Component({
  selector: 'bo-store-apps',
  styleUrls: ['./store-apps.component.css'],
  templateUrl: './store-apps.component.html',
})
export class StoreAppsComponent implements OnInit {
  category: Category = undefined;
  categoryString = 'All';
  storeItems: Observable<any>;
  storeItemsArray: StoreApplication[] = [];
  isAuthenticated: boolean = false;
  keyword: string = '';

  constructor(public storeService: StoreService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let categoryParam = params['category'];
      if (categoryParam && categoryParam !== 'All') {
        this.category = {id: undefined, name: categoryParam};
        this.categoryString = categoryParam;
        this.storeItems = this.storeService.getApplicationsByCategory(categoryParam);
      } else {
        this.category = undefined;
        this.categoryString = 'All';
        this.storeItems = this.storeService.getApplications();
      }
      this.storeItems.forEach(next => this.storeItemsArray = next);
    });
  }

  onClearSearch() {
    this.keyword = '';
    this.ngOnInit();
  }

  onSearch() {
    console.log(this.category);
    if (this.category && this.category.name && this.category.name !== 'All') {
      this.storeItems = this.storeService.searchApplicationsByCategory(this.category.name, this.keyword);
    } else {
      console.log('else block');
      this.storeItems = this.storeService.searchApplications(this.keyword);
    }
    this.storeItems.forEach(next => this.storeItemsArray = next);
  }

  onKeyEvent(event) {
    if (event.keyCode === 13) {
      this.onSearch();
    }
  }
}
