import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from './shared/types/Product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products: Product[] = [
    {
      id: 1,
      name: 'Wireless Headphones',
      price: 99.99,
      description: 'Noise cancelling Bluetooth headphones',
      quantity: 50, // Quantity
    },
    {
      id: 2,
      name: 'Smart Watch',
      price: 149.99,
      description: 'Fitness tracking smartwatch with GPS',
      quantity: 30, // Quantity
    },
    {
      id: 3,
      name: 'Laptop',
      price: 899.99,
      description: 'High-performance laptop for work and play',
      quantity: 20, // Quantity
    },
  ];

  getProducts(): Observable<Product[]> {
    return of(this.products);
  }

  getProduct(id: number): Observable<Product | undefined> {
    const product = this.products.find((p) => p.id === id);
    return of(product);
  }
}
