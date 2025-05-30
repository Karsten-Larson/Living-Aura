import { Component, inject, Input } from '@angular/core';
import { Product } from '../../shared/types/Product';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../../cart.service';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink, CommonModule],
  standalone: true,
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  @Input() product!: Product;

  cartService = inject(CartService);
  router = inject(Router);

  addToCart() {
    this.cartService.addToCart(this.product, 1);

    alert('Product added to cart');
  }

  redirectToCart() {
    this.router.navigate(['/cart']);
  }
}
