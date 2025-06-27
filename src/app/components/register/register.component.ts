import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  register: FormGroup;
  users: User[] = this.getUsers();

  constructor(
    private registerBuilder: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.register = this.registerBuilder.group({
      nombres: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    const userData = this.register.value;
    if (this.users.some((user) => user.email === userData.email)) {
      alert('El usuario ya está registrado con este correo electrónico');
      return;
    }
    this.users.push(userData);
    localStorage.setItem('users', JSON.stringify(this.users));
    this.openSnackBar(userData.email);
    this.register.reset();
    this.router.navigate(['']);
  }

  getUsers() {
    const storedData = localStorage.getItem('users');
    return storedData ? JSON.parse(storedData) : [];
  }

  openSnackBar(user: string) {
    this._snackBar.open(`Usuario ${user} registrado exitosamente`, 'Cerrar');
  }
}
