import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';
import { Product } from '../../models/product.model';
import { FakeStoreService } from '../../services/fake-store.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  products: Product[] = [];
  allProducts: Product[] = [];
  @Input() searchQuery = '';

  constructor(private apiConnection: FakeStoreService) {}

  ngOnInit() {
    this.apiConnection.getProducts().subscribe({
      next: (data) => {
        this.products = data.map((item: any) => ({
          id: item.id,
          title: item.title,
          image: item.image,
          price: item.price,
        }));
        this.allProducts = [...this.products];
      },
      error: (error) => console.error(error),
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['searchQuery']) {
      this.filterProducts();
    }
  }

  filterProducts() {
    if (this.searchQuery === '') {
      this.products = [...this.allProducts];
    } else {
      this.products = this.allProducts.filter((product) =>
        product.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }
}
