import { inject, Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Product } from './shared/types/Product';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private firestore = inject(Firestore);
  private userCollection = collection(this.firestore, 'products');

  getProducts(): Observable<Product[]> {
    return collectionData(this.userCollection, { idField: 'id' }) as Observable<
      Product[]
    >;
  }

  getProductById(id: string): Observable<Product | undefined> {
    return this.getProducts().pipe(
      map((products) => products.find((product: Product) => product.id === id))
    );
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    return this.getProducts().pipe(
      map((products) =>
        products.filter((product: Product) => product.category === category)
      )
    );
  }

  getCategories(): Observable<string[]> {
    return this.getProducts().pipe(
      map((products) => {
        const categories = products.map((product: Product) => product.category);
        return Array.from(new Set(categories));
      })
    );
  }
}
