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

import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'bo-browse-list',
  templateUrl: './store-browse-list.component.html',
})
export class StoreBrowseListComponent {

  @Input() browseItems: string[];
  selectedItemString: string = undefined;
  @Output() itemSelected = new EventEmitter();
  @Input() title: string = 'Categories';

  constructor() { }

  selectItem(category) {
    if (category === 'all') {
      this.selectedItemString = undefined;
    } else {
      this.selectedItemString = category;
    }
    this.itemSelected.emit({
      value: this.selectedItemString
    });
  }
}
