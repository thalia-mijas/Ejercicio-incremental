import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { BagProduct } from '../../models/bag-product.model';
import { Product } from '../../models/product.model';
import { FakeStoreService } from '../../services/fake-store.service';
import { addProduct } from '../../store/bag-products/bag-products.action';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    CurrencyPipe,
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {
  product: Partial<Product> = {};
  productId: string = '';

  selQuantity: number = 1;
  numbers: number[] = Array.from({ length: 10 }, (_, i) => i + 1);

  constructor(
    private mapRoute: ActivatedRoute,
    private apiConnection: FakeStoreService,
    private store: Store<{ product: BagProduct }>,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
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
      quantity: quantity!,
    };
    console.log(newProduct);
    this.store.dispatch(addProduct(newProduct));
    this.openSnackBar(product.title!);
  }

  openSnackBar(article: string) {
    this._snackBar.open(`Articulo ${article} agregado exitosamente`, 'Cerrar');
  }
}
