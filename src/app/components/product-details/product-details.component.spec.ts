import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyPipe } from '@angular/common';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { of } from 'rxjs';
import { mockProductChosen } from '../../mocks/product-chosen-mock copy';
import { FakeStoreService } from '../../services/fake-store.service';
import { bagProductsReducer } from '../../store/bag-products/bag-products.reducer';
import { ProductDetailsComponent } from './product-details.component';

describe('ProductDetailsComponent', () => {
  let component: ProductDetailsComponent;
  let fixture: ComponentFixture<ProductDetailsComponent>;
  let fakeServiceSpy: jasmine.SpyObj<FakeStoreService>;

  beforeEach(async () => {
    const routeMock = {
      paramMap: of(convertToParamMap({ id: '8' })),
    };

    fakeServiceSpy = jasmine.createSpyObj('FakeStoreService', ['getProduct']);
    fakeServiceSpy.getProduct.and.returnValue(of(mockProductChosen));

    await TestBed.configureTestingModule({
      imports: [ProductDetailsComponent],
      providers: [
        CurrencyPipe,
        { provide: ActivatedRoute, useValue: routeMock },
        provideHttpClient(withFetch()),
        provideStore({ products: bagProductsReducer }),
        provideAnimationsAsync(),
        { provide: FakeStoreService, useValue: fakeServiceSpy },
        {
          provide: MatSnackBar,
          useValue: jasmine.createSpyObj('MatSnackBar', ['open']),
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should read the param id from ActivatedRoute', () => {
    expect(component.productId).toBe('8');
  });

  it('should get details of product using ID of the route', () => {
    expect(fakeServiceSpy.getProduct).toHaveBeenCalledWith('8');
    console.log(mockProductChosen);
    expect(component.product).toEqual(mockProductChosen);
  });

  it('should dispatch addProduct action with selected quantity', () => {
    const snackBar = TestBed.inject(MatSnackBar);
    const snackBarSpy = spyOn(snackBar, 'open').and.callThrough();

    component.addProduct(mockProductChosen, 1);

    expect(snackBarSpy).toHaveBeenCalledWith(
      'Artículo Pierced Owl Rose Gold Plated Stainless Steel Double agregado exitosamente',
      'Cerrar'
    );
  });
});
