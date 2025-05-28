import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { mockProducts } from '../../mocks/cart-mock';

@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, ReactiveFormsModule],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.css',
})
export class BasketComponent {
  products = mockProducts;
  shipment: FormGroup;

  get totalPrice() {
    return this.products.reduce(
      (sum, product) => sum + product.price * product.quantity,
      0
    );
  }

  constructor(private shipmentBuilder: FormBuilder) {
    this.shipment = this.shipmentBuilder.group({
      nombres: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      direccion: ['', [Validators.required, Validators.email]],
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

  onSubmit() {
    const shipmentData = this.shipment.value;
    console.log(shipmentData);
    this.shipment.reset();
  }
}
