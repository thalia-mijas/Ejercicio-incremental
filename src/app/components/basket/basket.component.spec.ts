import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { Store } from '@ngrx/store';
import moment from 'moment';
import { of } from 'rxjs';
import { mockBagProducts } from '../../mocks/cart-mock';
import { BasketComponent } from './basket.component';

describe('BasketComponent', () => {
  let component: BasketComponent;
  let fixture: ComponentFixture<BasketComponent>;
  let storeSpy: jasmine.SpyObj<Store<any>>;
  let dialog: MatDialog;

  beforeEach(async () => {
    storeSpy = jasmine.createSpyObj('Store', ['select']);
    storeSpy.select.and.callFake((selector: any) => {
      if (selector === 'products') {
        return of(mockBagProducts);
      }
      return of([]);
    });

    await TestBed.configureTestingModule({
      imports: [BasketComponent, MatDialogModule],
      providers: [
        // No uses provideStore aquí para evitar conflicto
        provideAnimationsAsync(),
        FormBuilder,
        { provide: Store, useValue: storeSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BasketComponent);
    component = fixture.componentInstance;
    dialog = TestBed.inject(MatDialog);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate totalPrice correctly on init', () => {
    expect(component.totalPrice).toBe(
      mockBagProducts[0].price * mockBagProducts[0].quantity +
        mockBagProducts[1].price * mockBagProducts[1].quantity +
        mockBagProducts[2].price * mockBagProducts[2].quantity
    );
  });

  it('should invalidate fecha < minDate', () => {
    const ctrl = component.payment.get('fecha')!;
    const tooEarly = moment(component.minDate)
      .subtract(1, 'month')
      .toISOString();
    ctrl.setValue(tooEarly);
    expect(ctrl.errors).toEqual(
      jasmine.objectContaining({ fechaMenorMinima: true })
    );
  });

  it('should accept fecha >= minDate', () => {
    const ctrl = component.payment.get('fecha')!;
    const ok = moment(component.minDate).add(1, 'month').toISOString();
    ctrl.setValue(ok);
    expect(ctrl.errors).toBeNull();
  });
});
