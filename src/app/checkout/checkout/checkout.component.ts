import { Component } from '@angular/core';
import { CartService } from '../../cart.service';
import { Router } from '@angular/router';
import { CartItem } from '../../shared/types/CartItem';
import { CommonModule, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-checkout',
  imports: [CommonModule, NgFor, NgIf],
  standalone: true,
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent {
  cartItems: CartItem[] = [];
  total: number = 0;
  shippingAddress: any;

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
    this.total = this.cartService.getTotal();
    const stored = localStorage.getItem('shippingAddress');
    this.shippingAddress = stored ? JSON.parse(stored) : null;
  }

  placeOrder(): void {
    alert('Order placed successfully!');
    this.cartService.clearCart();
    localStorage.removeItem('shippingAddress');
    this.router.navigate(['/cart']);
  }
}
