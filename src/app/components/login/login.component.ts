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
import { Router } from '@angular/router';

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
  users: string[] = this.getUsers();

  constructor(private loginBuilder: FormBuilder, private router: Router) {
    this.login = this.loginBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit() {
    const userData = this.login.value;
    this.users.push(userData);
    sessionStorage.setItem('usersLogin', JSON.stringify(this.users));
    this.login.reset();
    this.router.navigate(['']);
  }

  getUsers() {
    const storedData = sessionStorage.getItem('usersLogin');
    return storedData ? JSON.parse(storedData) : [];
  }
}
