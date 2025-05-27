import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FakeStoreService } from '../../services/fake-store.service';

interface Product {
  id: number;
  title: string;
  image: string;
  price: string;
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  products: Product[] = [];

  constructor(private apiConnection: FakeStoreService) {
    this.loadProducts();
  }

  loadProducts() {
    this.apiConnection.getProducts().subscribe({
      next: (data) => {
        this.products = data.map((item: any) => ({
          id: item.id,
          title: item.title,
          image: item.image,
          price: item.price,
        }));
      },
      error: (error) => console.error(error),
    });
  }
}
