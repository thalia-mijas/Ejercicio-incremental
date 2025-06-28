import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { Store } from '@ngrx/store';
import moment from 'moment';
import { of } from 'rxjs';
import { mockBagProducts } from '../../mocks/cart-mock';
import { DialogFailedComponent } from '../dialog-failed/dialog-failed.component';
import { DialogSuccessfulComponent } from '../dialog-successful/dialog-successful.component';
import { BasketComponent } from './basket.component';

describe('BasketComponent', () => {
  let component: BasketComponent;
  let fixture: ComponentFixture<BasketComponent>;
  let openSpy: jasmine.Spy;

  beforeEach(async () => {
    const storeSpy = jasmine.createSpyObj('Store', ['select']);
    storeSpy.select.and.callFake((selector: any) => {
      if (selector === 'products') {
        return of(mockBagProducts);
      }
      return of([]);
    });

    await TestBed.configureTestingModule({
      imports: [BasketComponent, MatDialogModule],
      providers: [
        provideAnimationsAsync(),
        FormBuilder,
        { provide: Store, useValue: storeSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BasketComponent);
    component = fixture.componentInstance;

    // Espía el método real `open` del `MatDialog` ya instanciado
    openSpy = spyOn(component['dialog'], 'open').and.returnValue({
      afterClosed: () => of({}),
    } as any);

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

  it('should open DialogSuccessfulComponent if payment is successful', () => {
    component.payment.setValue({
      numero: '4999999999999999',
      fecha: moment(component.minDate).add(1, 'month').toISOString(),
      cvc: 123,
    });

    component.statePayment = true;

    component.openDialogSuccessful();
    fixture.detectChanges();

    expect(openSpy.calls.mostRecent().args[0]).toBe(DialogSuccessfulComponent);
  });

  it('should open DialogFailedComponent with paymentData and update it after close', fakeAsync(() => {
    const testPaymentData = {
      numero: '1234567890123456',
      fecha: moment().add(2, 'month').toISOString(),
      cvc: 321,
    };
    component.paymentData = { ...testPaymentData };

    const afterClosedResponse = of({
      data: { ...testPaymentData, numero: '1111222233334444' },
    });

    // Prevenir la recursión infinita durante este test
    spyOn(component, 'stepperEnd').and.callFake(() => {});

    openSpy.and.returnValue({
      afterClosed: () => afterClosedResponse,
    } as any);

    component.openDialogFailed();
    fixture.detectChanges();

    expect(openSpy).toHaveBeenCalledWith(
      DialogFailedComponent,
      jasmine.objectContaining({
        data: testPaymentData,
      })
    );

    tick();
    expect(component.paymentData.numero).toBe('1111222233334444');
  }));

  it('should not update paymentData if DialogFailedComponent is closed without data', fakeAsync(() => {
    const originalPaymentData = {
      numero: '1234567890123456',
      fecha: moment().add(2, 'month').toISOString(),
      cvc: 321,
    };
    component.paymentData = { ...originalPaymentData };

    // Simula cierre sin datos (undefined o sin propiedad "data")
    const afterClosedResponse = of({});

    // Evitamos recursividad en este test
    spyOn(component, 'stepperEnd').and.callFake(() => {});

    openSpy.and.returnValue({
      afterClosed: () => afterClosedResponse,
    } as any);

    component.openDialogFailed();
    fixture.detectChanges();

    tick();

    // paymentData no debe cambiar
    expect(component.paymentData).toEqual(originalPaymentData);
  }));
});
