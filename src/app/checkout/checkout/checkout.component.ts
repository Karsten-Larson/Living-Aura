import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CartService } from '../../cart.service';
import { CartItem } from '../../shared/types/CartItem';
import { AddressFormComponent } from '../address-form/address-form.component';

@Component({
  selector: 'app-checkout',
  imports: [CommonModule, RouterLink, FormsModule, AddressFormComponent],
  standalone: true,
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
  cartService = inject(CartService);

  items!: CartItem[];
  total = 0;

  ngOnInit(): void {
    this.items = this.cartService.cartItems();
    this.total = this.cartService.total();
  }
}
