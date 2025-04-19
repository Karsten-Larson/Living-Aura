import { Component, inject, NgModule, OnInit } from '@angular/core';
import { CartService } from '../../cart.service';
import { CartItem } from '../../shared/types/CartItem';
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule],
  selector: 'app-cart',
  standalone: true,
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  total: number = 0;

  cartService = inject(CartService);

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.cartItems = this.cartService.getCartItems();
    this.total = this.cartService.getTotal();
  }

  updateQuantity(productId: number, event: Event): void {
    const value = +(event.target as HTMLInputElement).value;
    if (value > 0) {
      this.cartService.updateQuantity(productId, value);
      this.loadCart();
    }
  }

  removeItem(productId: number): void {
    this.cartService.removeFromCart(productId);
    this.loadCart();
  }

  proceedToCheckout(): void {
    // Navigate to address form
    // e.g., using router: this.router.navigate(['/checkout/address']);
    alert('Proceeding to checkout...');
  }
}
