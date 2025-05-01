import { computed, Injectable, signal } from '@angular/core';
import { Product } from './shared/types/Product';
import { CartItem } from './shared/types/CartItem';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems = signal<CartItem[]>(
    JSON.parse(localStorage.getItem('cartItems') || '[]')
  );
  total = computed(() =>
    this.cartItems().reduce((acc, item) => {
      return acc + item.product.price * item.quantity;
    }, 0)
  );

  addToCart(product: Product, quantity = 1): void {
    const existingItem = this.cartItems().find(
      (item) => item.product.id === product.id
    );
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.cartItems.set([...this.cartItems(), { quantity, product }]);
    }
    //Keeps items in cart saved, even if you leave the site.
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems()));
  }

  delete(item: CartItem) {
    this.cartItems.set(
      this.cartItems().filter((item) => item.product.id !== item.product.id)
    );
    //Keeps items in cart saved, even if you leave the site.
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems()));
  }

  incrementQuantity(id: number) {
    let item = this.cartItems().find((item) => item.product.id === id);
    if (item) {
      item.quantity++;
    }
    //Keeps items in cart saved, even if you leave the site.
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems()));
  }

  decrementQuantity(id: number) {
    //old decrement section
    // let item = this.items.find((i) => i.id === id);
    // if (item){
    //   item.quantity--;
    // }

    //Checks when item hits 0 in qunatity and deletes
    const item = this.cartItems().find((item) => item.product.id === id);
    if (item) {
      item.quantity--;
      if (item.quantity <= 0) {
        this.delete(item);
      } else {
        localStorage.setItem('cartItems', JSON.stringify(this.cartItems()));
      }
    }

    //Keeps items in cart saved, even if you leave the site.
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems()));

    // Restore quantity to the product stock
    const productStock = JSON.parse(
      localStorage.getItem('productStock') || '[]'
    );
    const product = productStock.find((p: any) => p.id === id);
    if (product) {
      product.quantity++;
      localStorage.setItem('productStock', JSON.stringify(productStock));
    }
  }
}
