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
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  login: FormGroup;
  users: User[] = this.getUsers();

  constructor(
    private loginBuilder: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.login = this.loginBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    const userData = this.login.value;
    let indexUser = -1;
    const usersRegistered = this.getUsersRegistered();
    if (!usersRegistered.some((user: User) => user.email === userData.email)) {
      this._snackBar.open('Usuario no existe, por favor registrese', 'Cerrar');
    } else {
      const indexUser = usersRegistered.findIndex(
        (user) => user.email === userData.email
      );
      if (
        indexUser >= 0 &&
        usersRegistered[indexUser].password === userData.password
      ) {
        this.openSnackBar(usersRegistered[indexUser].nombres);
        this.users.push(usersRegistered[indexUser]);
        localStorage.setItem('usersLogin', JSON.stringify(this.users));
        this.login.reset();
        this.router.navigate(['']);
      } else {
        this._snackBar.open('Credenciales incorrectas', 'Cerrar');
      }
    }
  }

  getUsers() {
    const storedData = localStorage.getItem('usersLogin');
    return storedData ? JSON.parse(storedData) : [];
  }

  getUsersRegistered(): User[] {
    const storedData = localStorage.getItem('users');
    return storedData ? JSON.parse(storedData) : [];
  }

  openSnackBar(user: string) {
    this._snackBar.open(`Bienvenid@ ${user}`, 'Cerrar');
  }
}
