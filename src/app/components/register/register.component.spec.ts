import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatSnackBar } from '@angular/material/snack-bar';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { Router } from '@angular/router';
import { mockNewUser } from '../../mocks/newUser-mock copy';
import { mockUser } from '../../mocks/user-mock';
import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let routerSpy: jasmine.SpyObj<Router>;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;

  beforeEach(async () => {
    localStorage.removeItem('users');

    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    // Guardamos un usuario simulado en localStorage antes de crear el componente
    localStorage.setItem('users', JSON.stringify([mockUser]));

    await TestBed.configureTestingModule({
      imports: [RegisterComponent],
      providers: [
        provideAnimationsAsync(),
        { provide: Router, useValue: routerSpy },
        { provide: MatSnackBar, useValue: snackBarSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component and initialize the form', () => {
    expect(component).toBeTruthy();
    expect(component.register).toBeDefined();
    expect(component.register.valid).toBeFalse();
  });

  it('should prevent registration if email already exists', () => {
    spyOn(window, 'alert'); // Espiamos la alerta para validar que fue llamada

    component.register.setValue(mockUser);
    component.onSubmit();

    expect(window.alert).toHaveBeenCalledWith(
      'El usuario ya está registrado con este correo electrónico'
    );
    expect(snackBarSpy.open).not.toHaveBeenCalled();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });

  it('should register new user, store it, reset form, and navigate', () => {
    component.register.setValue(mockNewUser);
    expect(component.register.valid).toBeTrue(); // opcional: asegura que el form es válido

    component.onSubmit();

    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');

    expect(storedUsers.length).toBe(2);
    expect(
      storedUsers.some((u: any) => u.email === mockNewUser.email)
    ).toBeTrue();

    expect(snackBarSpy.open).toHaveBeenCalledWith(
      `Usuario ${mockNewUser.email} registrado exitosamente`,
      'Cerrar'
    );

    expect(routerSpy.navigate).toHaveBeenCalledWith(['']);
  });
});
