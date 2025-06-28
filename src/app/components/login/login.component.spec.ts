import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatSnackBar } from '@angular/material/snack-bar';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { Router } from '@angular/router';
import { mockUser } from '../../mocks/user-mock';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let routerSpy: jasmine.SpyObj<Router>;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;

  beforeEach(async () => {
    // Limpiamos localStorage y preparamos los datos simulados
    localStorage.clear();
    localStorage.setItem('users', JSON.stringify([mockUser]));

    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        provideAnimationsAsync(),
        { provide: Router, useValue: routerSpy },
        { provide: MatSnackBar, useValue: snackBarSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an invalid form initially', () => {
    expect(component.login.valid).toBeFalse();
  });

  it('should show snackBar if user is not registered', () => {
    component.login.setValue({
      email: 'noexiste@example.com',
      password: '123456',
    });

    component.onSubmit();

    expect(snackBarSpy.open).toHaveBeenCalledWith(
      'Usuario no existe, por favor registrese',
      'Cerrar'
    );
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });

  it('should show snackBar if password is incorrect', () => {
    component.login.setValue({
      email: mockUser.email,
      password: 'incorrecta',
    });

    component.onSubmit();

    expect(snackBarSpy.open).toHaveBeenCalledWith(
      'Credenciales incorrectas',
      'Cerrar'
    );
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });

  it('should login successfully with correct credentials', () => {
    component.login.setValue({
      email: mockUser.email,
      password: mockUser.password,
    });

    component.onSubmit();

    const loggedInUsers = JSON.parse(
      localStorage.getItem('usersLogin') || '[]'
    );

    expect(snackBarSpy.open).toHaveBeenCalledWith(
      `Bienvenid@ ${mockUser.nombres}`,
      'Cerrar'
    );
    expect(loggedInUsers.length).toBe(1);
    expect(loggedInUsers[0].email).toBe(mockUser.email);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['']);
  });
});
