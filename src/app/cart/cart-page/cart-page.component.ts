import { Component } from '@angular/core';
import { CartComponent } from '../cart/cart.component';

@Component({
  selector: 'app-cart-page',
  imports: [CartComponent],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css',
})
export class CartPageComponent {}
