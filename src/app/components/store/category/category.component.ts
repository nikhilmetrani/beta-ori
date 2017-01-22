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
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Category, Installer, CategoryService, Code, CodeDefinitionService } from '../../../core';

@Component({
    selector: 'bo-category',
    templateUrl: './category.component.html',
    providers: [CodeDefinitionService]
})

export class CategoryComponent implements OnInit {
    newCategory: Category = {
        id: undefined,
        name: undefined
    };

    categoryArray: Code[] = [];
    categoryObservable: Observable<any>;
    nameIsUnique: boolean = true;

    constructor(private categoryService: CategoryService, private codeService: CodeDefinitionService, 
        private router: Router) {}

    ngOnInit() {
        this.categoryObservable = this.codeService.getCategoryCodes();
        this.categoryObservable.subscribe(categories => {
            categories.forEach(category => {
                this.categoryArray.push(category.value);
            });
        });
    }

    selectCategory($event){

    }
    
    onSubmitCreateCategory(event) {
        if (event === 'create') {
            this.categoryService.createCategory(this.newCategory).subscribe(
                (response) => {
                    if (response.status === 200) {
                        location.reload();
                    }
                }
            );
        } else if (event === 'delete') {
            this.categoryService.deleteCategory(this.newCategory).subscribe(
                (response) => {
                    if (response.status === 200) {
                        this.router.navigate(['/store/category']);
                    }
                }
            );
        } else {
            this.router.navigate(['/store']);
        }
    }
}
