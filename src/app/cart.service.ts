import { Injectable } from '@angular/core';
import { Product } from './shared/types/Product';
import { CartItem } from './shared/types/CartItem';


@Injectable({
  providedIn: 'root',
})
export class CartService {

  //Old array before changing the array to save original cart items
  //private items: any[] = [];
  private items: any[] = JSON.parse(localStorage.getItem('cartItems')|| '[]');


  addToCart(product: any) {
    //old addToCart function
    //this.items.push({ ...product, quantity: 1 });

    //increments cart without adding a new entry to the cart of the same item
    const existingItem = this.items.find((item) => item.id === product.id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.items.push({ ...product, quantity: 1 });
    }
    //Keeps items in cart saved, even if you leave the site.
    localStorage.setItem('cartItems', JSON.stringify(this.items));
  }

  getItems() {
    return this.items;
  }

  delete(item: any) {
    this.items = this.items.filter((i) => i.id !== item.id);
    //Keeps items in cart saved, even if you leave the site.
    localStorage.setItem('cartItems', JSON.stringify(this.items));
  }

  incrementQuantity(id: number) {
    let item = this.items.find((i) => i.id === id);
    if (item) {
      item.quantity++;
    }
    //Keeps items in cart saved, even if you leave the site.
    localStorage.setItem('cartItems', JSON.stringify(this.items));
  }

  decrementQuantity(id: number) {
    //old decrement section
    // let item = this.items.find((i) => i.id === id);
    // if (item){
    //   item.quantity--;
    // }

    //Checks when item hits 0 in qunatity and deletes
    const item = this.items.find((i) => i.id === id);
    if (item) {
      item.quantity--;
      if (item.quantity <= 0) {
        this.delete(item);
      } else {
        localStorage.setItem('cartItems', JSON.stringify(this.items));
      }
    }
    
    //Keeps items in cart saved, even if you leave the site.
    localStorage.setItem('cartItems', JSON.stringify(this.items));

    // Restore quantity to the product stock
    const productStock = JSON.parse(localStorage.getItem('productStock') || '[]');
    const product = productStock.find((p: any) => p.id === id);
    if (product) {
      product.quantity++;
      localStorage.setItem('productStock', JSON.stringify(productStock));
    }
  }

  getTotal() {
    return this.items.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);
    
  }


}
