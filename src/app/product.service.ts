import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from './shared/types/Product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products: Product[] = [
    new Product(
      1,
      'Wireless Headphones',
      99.99,
      'Noise cancelling Bluetooth headphones'
    ),
    new Product(
      2,
      'Smart Watch',
      149.99,
      'Fitness tracking smartwatch with GPS'
    ),
    new Product(
      3,
      'Laptop',
      899.99,
      'High-performance laptop for work and play'
    ),
  ];

  getProducts(): Observable<Product[]> {
    return of(this.products);
  }

  getProduct(id: number): Observable<Product | undefined> {
    const product = this.products.find((p) => p.id === id);
    return of(product);
  }
}
