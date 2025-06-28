import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
// tslint:disable-next-line:no-duplicate-imports
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import {
  MatDatepicker,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import * as _moment from 'moment';
import { default as _rollupMoment, Moment } from 'moment';

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
  selector: 'app-dialog-failed',
  providers: [provideMomentDateAdapter(MY_FORMATS)],
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    ReactiveFormsModule,
    MatDatepickerModule,
  ],
  templateUrl: './dialog-failed.component.html',
  styleUrl: './dialog-failed.component.css',
})
export class DialogFailedComponent {
  readonly data = inject(MAT_DIALOG_DATA);
  payment: FormGroup;
  nuevaFecha = moment();
  minDate = this.nuevaFecha.add(1, 'month').format('YYYY-MM-DD');

  constructor(
    private paymentBuilder: FormBuilder,
    private dialogRef: MatDialogRef<DialogFailedComponent>
  ) {
    this.payment = this.paymentBuilder.group({
      numero: [
        this.data.numero,
        [
          Validators.required,
          Validators.minLength(16),
          Validators.maxLength(16),
        ],
      ],
      fecha: [
        this.data.fecha,
        [Validators.required, this.fechaMinimaValidator(this.minDate)],
      ],
      cvc: [
        this.data.cvc,
        [Validators.required, Validators.minLength(3), Validators.maxLength(3)],
      ],
    });
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

  fechaMinimaValidator(minDate: string) {
    return (control: AbstractControl): ValidationErrors | null => {
      const valor = control.value;
      if (!valor) return null;

      const seleccionada = moment(valor);
      const minima = moment(minDate);

      return seleccionada.isBefore(minima) ? { fechaMenorMinima: true } : null;
    };
  }

  onNoClick() {
    this.dialogRef.close();
  }

  savePayment() {
    this.dialogRef.close({ data: this.payment.value });
  }
}
