import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FakeStoreService {
  url: string = '';

  constructor(private http: HttpClient) {
    this.url = 'https://fakestoreapi.com';
  }

  getProducts(): Observable<any> {
    return this.http.get(`${this.url}/products`);
  }

  getProduct(id: string): Observable<any> {
    return this.http.get(`${this.url}/products/${id}`);
  }
}
