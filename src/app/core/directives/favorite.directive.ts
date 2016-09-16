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

import {Directive, HostBinding, HostListener, Input} from '@angular/core';

@Directive({
    selector: '[mwFavorite]'
})
export class FavoriteDirective {
    @HostBinding('class.is-favorite') isFavorite = true;
    @HostBinding('class.is-favorite-hovering') hovering = false;

    @HostListener('mouseenter')
    onMouseEnter() {
        this.hovering = true;
    }

    @HostListener('mouseleave')
    onMouseLeave() {
        this.hovering = false;
    }

    @Input()
    set mwFavorite(value) {
        this.isFavorite = value;
    }
}