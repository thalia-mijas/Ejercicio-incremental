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
  users: string[] = this.getUsers();

  constructor(private registerBuilder: FormBuilder, private router: Router) {
    this.register = this.registerBuilder.group({
      nombres: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit() {
    const userData = this.register.value;
    this.users.push(userData);
    sessionStorage.setItem('users', JSON.stringify(this.users));
    this.register.reset();
    this.router.navigate(['']);
  }

  getUsers() {
    const storedData = sessionStorage.getItem('users');
    return storedData ? JSON.parse(storedData) : [];
  }
}
