import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { BagProduct } from '../../models/bag-product.model';
import { addProduct } from '../../store/bag-products/bag-products.action';
import { ProductDetailsComponent } from '../product-details/product-details.component';
// import { mockProducts } from '../../mocks/cart-mock';

@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [
    CommonModule,
    CurrencyPipe,
    ReactiveFormsModule,
    ProductDetailsComponent,
  ],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.css',
})
export class BasketComponent {
  // products = mockProducts;
  products: Observable<BagProduct[]>;
  shipment: FormGroup;
  totalPrice: number = 0;

  constructor(
    private shipmentBuilder: FormBuilder,
    private store: Store<{ products: BagProduct[] }>
  ) {
    this.products = this.store.select('products');
    this.shipment = this.shipmentBuilder.group({
      nombres: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      cp: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(10),
        ],
      ],
      telefono: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.products.subscribe((products) => {
      this.totalPrice = products.reduce(
        (sum, product) => sum + product.price * product.quantity,
        0
      );
    });
  }

  onSubmit() {
    const shipmentData = this.shipment.value;
    console.log(shipmentData);
    this.shipment.reset();
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
    this.store.dispatch(addProduct(newProduct));
  }

  delProduct(product: BagProduct) {
    if (!product || product.id === undefined) return;
    this.store.dispatch(addProduct(product));
  }
}
