import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
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

@Component({
  selector: 'app-dialog-failed',
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
  ],
  templateUrl: './dialog-failed.component.html',
  styleUrl: './dialog-failed.component.css',
})
export class DialogFailedComponent {
  readonly data = inject(MAT_DIALOG_DATA);
  payment: FormGroup;

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
      fecha: [this.data.fecha, [Validators.required]],
      cvc: [
        this.data.cvc,
        [Validators.required, Validators.minLength(3), Validators.maxLength(3)],
      ],
    });
  }

  onNoClick() {
    // console.log('Cancelar');
    this.dialogRef.close('No actualizar');
  }

  savePayment() {
    // if (this.payment.valid) {
    //   this.dialogRef.close(this.payment.value);
    // console.log('Datos válidos:', this.payment.value);
    this.dialogRef.close({ state: 'actualizar', data: this.payment.value });
    // }
  }
}
