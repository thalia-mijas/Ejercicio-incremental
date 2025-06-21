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
import { ProductDetailsComponent } from '../product-details/product-details.component';
// import { mockProducts } from '../../mocks/cart-mock';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { Card } from '../../models/card.model';
import { DialogFailedComponent } from '../dialog-failed/dialog-failed.component';
import { DialogProcessingComponent } from '../dialog-processing/dialog-processing.component';
import { DialogSuccessfulComponent } from '../dialog-successful/dialog-successful.component';

@Component({
  selector: 'app-basket',
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
  standalone: true,
  imports: [
    CommonModule,
    CurrencyPipe,
    ReactiveFormsModule,
    ProductDetailsComponent,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    DialogProcessingComponent,
    DialogSuccessfulComponent,
    DialogFailedComponent,
  ],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.css',
})
export class BasketComponent {
  // products = mockProducts;
  products: Observable<BagProduct[]>;
  shipment: FormGroup;
  payment: FormGroup;
  totalPrice: number = 0;
  paymentData: Partial<Card> = {};
  statePayment: boolean = true;

  constructor(
    private shipmentBuilder: FormBuilder,
    private paymentBuilder: FormBuilder,
    private store: Store<{ products: BagProduct[] }>,
    private dialog: MatDialog
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
    this.payment = this.paymentBuilder.group({
      numero: [
        '',
        [
          Validators.required,
          Validators.minLength(16),
          Validators.maxLength(16),
        ],
      ],
      fecha: ['', [Validators.required]],
      cvc: [
        '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(3)],
      ],
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

  onSubmitShipment() {
    const shipmentData = this.shipment.value;
    console.log(shipmentData);
  }

  onSubmitPayment() {
    if (this.payment.value) {
      this.paymentData = this.payment.value;
    }
    console.log(this.paymentData);
  }

  openDialogSuccessful(): void {
    console.log('Proceso exitoso');
    this.dialog.open(DialogSuccessfulComponent);
  }

  openDialogFailed(): void {
    console.log('Pago fallido');
    console.log('data payment: ', this.payment.value);

    const dialogRef = this.dialog.open(DialogFailedComponent, {
      data: this.paymentData,
    });

    dialogRef.afterClosed().subscribe((resultado) => {
      console.log('Resultado after close: ', resultado);
      if (resultado.state === 'actualizar') {
        this.paymentData = resultado.data;
        this.stepperEnd();
      }
    });
  }

  stepperEnd() {
    this.onSubmitShipment();
    this.onSubmitPayment();
    this.shipment.reset();
    this.payment.reset();

    const dialogRef = this.dialog.open(DialogProcessingComponent);

    setTimeout(() => {
      dialogRef.close(); // Cierra solo ese diálogo
      if (this.statePayment) {
        this.openDialogSuccessful();
      } else {
        this.openDialogFailed();
      }
    }, 3000);
  }

  // addProduct(product: Partial<BagProduct>, quantity: number) {
  //   if (!product || product.id === undefined || quantity === undefined) return;

  //   const newProduct: BagProduct = {
  //     id: product.id!,
  //     title: product.title!,
  //     image: product.image!,
  //     price: product.price!,
  //     quantity,
  //   };
  //   this.store.dispatch(addProduct(newProduct));
  // }

  // delProduct(product: BagProduct) {
  //   if (!product || product.id === undefined) return;
  //   this.store.dispatch(addProduct(product));
  // }
}
