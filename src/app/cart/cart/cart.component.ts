import { Component, inject, OnInit, Input } from '@angular/core';
import { CartService } from '../../cart.service';
import { CommonModule } from '@angular/common';
import { CartItem } from '../../shared/types/CartItem';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  @Input() overflow: boolean = false;

  cartService = inject(CartService);

  items: CartItem[] = [];

  ngOnInit(): void {
    this.items = this.cartService.cartItems();
  }

  deleteFromCart(item: any) {
    this.cartService.delete(item);
  }
}
