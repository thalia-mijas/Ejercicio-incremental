import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FakeStoreService } from '../../services/fake-store.service';

interface ProductDetail {
  title: string;
  image: string;
  price: string;
}

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CurrencyPipe, CommonModule, FormsModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent {
  product: ProductDetail | null = null;
  productId: string = '';

  quantity: number = 1;
  numbers: number[] = Array.from({ length: 10 }, (_, i) => i + 1);

  constructor(
    private mapRoute: ActivatedRoute,
    private apiConnection: FakeStoreService
  ) {
    this.mapRoute.paramMap.subscribe((params) => {
      this.productId = params.get('id')!;
      this.apiConnection.getProduct(this.productId).subscribe({
        next: (data) => {
          this.product = {
            title: data.title,
            image: data.image,
            price: data.price,
          };
        },
        error: (error) => console.error(error),
      });
    });
  }
}
