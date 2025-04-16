import { Injectable } from '@angular/core';
import { Product } from './shared/types/Product';
import { CartItem } from './shared/types/CartItem';


@Injectable({
  providedIn: 'root',
})
export class CartService {
  
  private items: CartItem[] = [];

  getCartItems(): CartItem[] {
    return [...this.items]; 
  }

  addToCart(product: Product): void {
    const existingItem = this.items.find(
      (item) => item.product.id === product.id
    );
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.items.push(new CartItem(1, product));
    }
  }

  removeFromCart(productId: number): void {
    this.items = this.items.filter((item) => item.product.id !== productId);
  }

  updateQuantity(productId: number, quantity: number): void {
    const item = this.items.find((item) => item.product.id === productId);
    if (item) {
      item.quantity = quantity;
    }
  }

  getTotal(): number {
    return this.items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  }

  clearCart(): void {
    this.items = [];
  }
}
