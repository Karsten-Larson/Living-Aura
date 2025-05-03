import { computed, Injectable, signal } from '@angular/core';
import { Product } from './shared/types/Product';
import { CartItem } from './shared/types/CartItem';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private items = signal<CartItem[]>(
    JSON.parse(localStorage.getItem('cartItems') || '[]')
  );
  cartItems = computed(() =>
    this.items()
      .slice()
      .sort((a, b) => a.product.title.localeCompare(b.product.title))
  );
  total = computed(() =>
    this.items().reduce((acc, item) => {
      return acc + item.product.price * item.quantity;
    }, 0)
  );

  private updateItem(id: string, fn: (item: CartItem) => void) {
    this.items.update((items) => {
      const item = items.find((i) => i.product.id === id);
      if (item) {
        fn(item);
      }
      return [...items.filter((i) => i.product.id != id), item] as CartItem[];
    });
  }

  private saveItems() {
    localStorage.setItem('cartItems', JSON.stringify(this.items()));
  }

  addToCart(product: Product, quantity = 1): void {
    this.items.update((items) => {
      const existingItem = items.find((item) => item.product.id === product.id);
      if (existingItem) {
        if (existingItem.quantity + quantity > product.stock) {
          alert('Not enough stock available');
          return items;
        }

        existingItem.quantity += quantity;
        return items;
      } else {
        return [...items, { quantity, product }];
      }
    });

    this.saveItems();
  }

  delete(item: CartItem) {
    this.items.update((items) =>
      items.filter((i) => i.product.id != item.product.id)
    );

    this.saveItems();
  }

  incrementQuantity(id: string) {
    this.updateItem(id, (item) => {
      if (item.quantity < item.product.stock) {
        item.quantity++;
      }
    });

    this.saveItems();
  }

  decrementQuantity(id: string) {
    this.updateItem(id, (item) => {
      if (item.quantity <= 1) {
        item.quantity = 1;
        return;
      }

      item.quantity--;
    });

    this.saveItems();
  }
}
