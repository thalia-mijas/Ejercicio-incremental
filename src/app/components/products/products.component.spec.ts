import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyPipe } from '@angular/common';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { mockProducts } from '../../mocks/products-mock';
import { FakeStoreService } from '../../services/fake-store.service';
import { ProductsComponent } from './products.component';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let fakeStoreSpy: jasmine.SpyObj<FakeStoreService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('FakeStoreService', ['getProducts']);

    await TestBed.configureTestingModule({
      imports: [ProductsComponent],
      providers: [
        provideHttpClient(withFetch()),
        CurrencyPipe,
        { provide: FakeStoreService, useValue: spy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;

    fakeStoreSpy = TestBed.inject(
      FakeStoreService
    ) as jasmine.SpyObj<FakeStoreService>;
    fakeStoreSpy.getProducts.and.returnValue(of(mockProducts));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('it should show products on init', () => {
    expect(fakeStoreSpy.getProducts).toHaveBeenCalled();
    expect(component.products).toEqual(mockProducts);
    expect(component.allProducts).toEqual(mockProducts);
  });

  it('should manage errors if the service has an error', () => {
    // Espiamos el console.error si se usa en el componente
    const consoleSpy = spyOn(console, 'error');

    fakeStoreSpy.getProducts.and.returnValue(
      throwError(() => new Error('Error de red'))
    );

    // Creamos un nuevo fixture para reinicializar el componente con la respuesta fallida
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;

    // Ejecutar ngOnInit simulando el error
    fixture.detectChanges();

    expect(fakeStoreSpy.getProducts).toHaveBeenCalled();
    expect(component.products).toEqual([]); // o lo que esperes que quede en error
    expect(consoleSpy).toHaveBeenCalledWith(jasmine.any(Error));
  });

  it('should show only products according title when change searchQuery', () => {
    component.allProducts = [...mockProducts];
    component.searchQuery = 'slim';
    component.ngOnChanges({
      searchQuery: {
        currentValue: 'slim',
        previousValue: '',
        firstChange: false,
        isFirstChange: () => false,
      },
    });

    expect(component.products.length).toBe(1);
    expect(component.products[0].title.toLowerCase()).toContain('slim');
  });

  it('should show all products if searchQuery in empty', () => {
    component.allProducts = [...mockProducts];
    component.searchQuery = '';
    component.ngOnChanges({
      searchQuery: {
        currentValue: '',
        previousValue: 'alguna búsqueda',
        firstChange: false,
        isFirstChange: () => false,
      },
    });

    expect(component.products).toEqual(mockProducts);
  });
});
