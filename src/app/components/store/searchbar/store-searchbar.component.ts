import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'bo-store-searchbar',
  templateUrl: 'store-searchbar.component.html'
})
export class StoreSearchBarComponent {
  query: string = undefined;

  constructor (private router: Router) {}

  onSearch() {
    if (this.query === undefined || this.query === '') {
      this.router.navigate(['/store'], {preserveQueryParams: true});
    } else {
      if (localStorage.getItem('client') === 'copper') {
        this.router.navigate(['/store/search'], {queryParams: {client: 'copper', q: this.query}});
      } else {
        this.router.navigate(['/store/search'], {queryParams: {q: this.query}});
      }
    }
  }

  onClearSearch() {
    this.query = undefined;
    this.onSearch();
  }

  onKeyEvent(event) {
    if (event.keyCode === 13) {
      this.onSearch();
    }
  }
}
