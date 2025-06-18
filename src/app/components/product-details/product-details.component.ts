import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { BagProduct } from '../../models/bag-product.model';
import { Product } from '../../models/product.model';
import { FakeStoreService } from '../../services/fake-store.service';
import { addProduct } from '../../store/bag-products/bag-products.action';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CurrencyPipe, CommonModule, FormsModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent {
  product: Partial<Product> = {};
  productId: string = '';

  quantity: number = 1;
  numbers: number[] = Array.from({ length: 10 }, (_, i) => i + 1);

  constructor(
    private mapRoute: ActivatedRoute,
    private apiConnection: FakeStoreService,
    private store: Store<{ product: BagProduct }>
  ) {
    this.mapRoute.paramMap.subscribe((params) => {
      this.productId = params.get('id')!;
      this.apiConnection.getProduct(this.productId).subscribe({
        next: (data) => {
          this.product = {
            id: data.id,
            title: data.title,
            image: data.image,
            price: data.price,
          };
        },
        error: (error) => console.error(error),
      });
    });
  }

  addProduct(product: Partial<BagProduct>, quantity: number) {
    if (!product || product.id === undefined || quantity === undefined) return;

    const newProduct: BagProduct = {
      id: product.id!,
      title: product.title!,
      image: product.image!,
      price: product.price!,
      quantity,
    };
    console.log(newProduct);
    this.store.dispatch(addProduct(newProduct));
    alert('Articulo agregado exitosamente');
  }
}
