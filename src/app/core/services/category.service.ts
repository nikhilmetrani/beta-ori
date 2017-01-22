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

import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import { Category } from '../';
import { JsonHttp } from './json-http';

@Injectable()
export class CategoryService {
    categoryUrl: string = '/api/1/store/';

    constructor(private http: JsonHttp) { }

    getCategoryUrl(): string {
        return this.categoryUrl;
    }

    getCategoryById(categoryId: string) {
        return this.http.get(this.getCategoryUrl() + '/' + categoryId)
            .map((response) => {
                return <Category>response.json();
            })
            .catch(this.logError);
    }

    createCategory(category: Category) {
        return this.http.post(this.getCategoryUrl() + '/category/create', category);
    }

    deleteCategory(category: Category) {
        return this.http.post(this.getCategoryUrl() + '/category/delete', category);
    }

    checkCategoryNameExists(categoryName: string) {
        return this.http.get(this.getCategoryUrl() + '/category/check?name=' + categoryName);
    }

    logError(err: Response) {
        return Observable.throw(err.json().error || 'Server error');
    }
}
