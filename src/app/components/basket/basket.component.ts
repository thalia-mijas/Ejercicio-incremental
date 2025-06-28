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
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDatepicker,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import * as _moment from 'moment';
import { default as _rollupMoment, Moment } from 'moment';
import { Card } from '../../models/card.model';
import { DialogFailedComponent } from '../dialog-failed/dialog-failed.component';
import { DialogProcessingComponent } from '../dialog-processing/dialog-processing.component';
import { DialogSuccessfulComponent } from '../dialog-successful/dialog-successful.component';

const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YY',
  },
  display: {
    dateInput: 'MM/YY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-basket',
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
    provideMomentDateAdapter(MY_FORMATS),
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
    MatDatepickerModule,
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
  statePayment: boolean = false;
  nuevaFecha = moment();
  minDate = this.nuevaFecha.add(1, 'month').format('YYYY-MM');

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
      fecha: [
        '',
        [Validators.required, this.fechaMinimaValidator(this.minDate)],
      ],
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

  fechaMinimaValidator(minDate: string) {
    return (control: AbstractControl): ValidationErrors | null => {
      const valor = control.value;
      if (!valor) return null;

      const seleccionada = moment(valor);
      const minima = moment(minDate);

      return seleccionada.isBefore(minima) ? { fechaMenorMinima: true } : null;
    };
  }

  setMonthAndYear(
    normalizedMonthAndYear: Moment,
    datepicker: MatDatepicker<Moment>
  ) {
    const ctrl = this.payment.get('fecha');
    if (ctrl) {
      this.nuevaFecha.month(normalizedMonthAndYear.month());
      this.nuevaFecha.year(normalizedMonthAndYear.year());
      ctrl.setValue(this.nuevaFecha);
      datepicker.close();
    }
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

  verifyPayment() {
    if (this.paymentData.numero === '4999999999999999') {
      this.statePayment = true;
    }
  }

  openDialogSuccessful(): void {
    this.dialog.open(DialogSuccessfulComponent);
    this.shipment.reset();
    this.payment.reset();
  }

  openDialogFailed(): void {
    const dialogRef = this.dialog.open(DialogFailedComponent, {
      data: this.paymentData,
    });

    dialogRef.afterClosed().subscribe((resultado) => {
      if (resultado?.state === 'actualizar') {
        this.paymentData = resultado.data;
        this.stepperEnd();
      }
    });
  }

  submitFromForm() {
    this.onSubmitShipment();
    this.onSubmitPayment();
    this.stepperEnd();
  }

  stepperEnd() {
    this.verifyPayment();

    const dialogRef = this.dialog.open(DialogProcessingComponent);

    setTimeout(() => {
      dialogRef.close();
      if (this.statePayment) {
        this.openDialogSuccessful();
      } else {
        this.openDialogFailed();
      }
    }, 3000);
  }
}
