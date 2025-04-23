import { Component, inject, NgModule, OnInit } from '@angular/core';
import { CartService } from '../../cart.service';
import { CartItem } from '../../shared/types/CartItem';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { NgModel } from '@angular/forms';
import { ProductListComponent } from '../../product/product-list/product-list.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, ProductListComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  cartService = inject(CartService);

  deleteFromCart(item : any) {
    this.cartService.delete(item);
  }

  constructor() {
    
  }
  
}
