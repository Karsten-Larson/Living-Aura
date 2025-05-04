import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CartService } from '../../cart.service';
import { CartItem } from '../../shared/types/CartItem';
import { AddressFormComponent } from '../address-form/address-form.component';
import { Address } from '../../shared/types/Address';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-checkout',
  imports: [CommonModule, RouterLink, FormsModule, AddressFormComponent],
  standalone: true,
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
  cartService = inject(CartService);
  authService = inject(AuthService);

  items!: CartItem[];
  total = 0;

  shippingAddress: Address = {
    firstName: this.authService.user()?.displayName?.split(' ')[0] || '',
    lastName: this.authService.user()?.displayName?.split(' ')[1] || '',
    address: '',
    city: '',
    state: '',
    zip: '',
  };
  billingAddress: Address = {
    firstName: this.authService.user()?.displayName?.split(' ')[0] || '',
    lastName: this.authService.user()?.displayName?.split(' ')[1] || '',
    address: '',
    city: '',
    state: '',
    zip: '',
  };

  shippingSameAsBilling = false;

  ngOnInit(): void {
    this.items = this.cartService.cartItems();
    this.total = this.cartService.total();
  }
}
