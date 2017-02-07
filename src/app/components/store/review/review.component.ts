import { Component, Input } from '@angular/core';
import { Review } from '../../../core';
import { Router } from '@angular/router';

@Component({
    selector: 'bo-review',
    templateUrl: './review.component.html',
    styleUrls: ['./review.component.css'],
})
export class ReviewComponent {
    @Input() review: Review;

    constructor(private router: Router) { }

}
