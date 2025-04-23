import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../cart.service';
import { CommonModule } from '@angular/common';
import { CartItem } from '../../shared/types/CartItem';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  cartService = inject(CartService);

  items: CartItem[] = [];

  ngOnInit(): void {
    this.items = this.cartService.cartItems();
  }

  deleteFromCart(item: any) {
    this.cartService.delete(item);
  }
}
