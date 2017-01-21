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
import { StoreApplication, Category } from '../../../core';


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

  // _open: boolean = false;
  // _positionNum: number = 0;
  // _closeOnClickOutside: boolean = false;
  // _showOverlay: boolean = false;
  // _animate: boolean = true;
  // _trapFocus: boolean = true;
  // _autoFocus: boolean = true;
  // _keyClose: boolean = false;

  constructor(public storeService: StoreService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let categoryParam = params['category'];
      if (categoryParam && categoryParam !== 'All') {
        this.category = { id: undefined, name: categoryParam };
        this.categoryString = categoryParam;
        this.storeItems = this.storeService.getApplicationsByCategory(categoryParam);
      } else {
        this.category = undefined;
        this.categoryString = 'All';
        this.storeItems = this.storeService.getApplications();
      }
    });
    this.storeItems.subscribe(next => this.storeItemsArray = next);
  }
}
