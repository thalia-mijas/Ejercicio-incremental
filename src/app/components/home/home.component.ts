import { Component } from '@angular/core';
import { ProductsComponent } from '../products/products.component';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductsComponent, SearchComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  searchQuery = '';

  onSearch(query: string) {
    this.searchQuery = query;
  }
}
