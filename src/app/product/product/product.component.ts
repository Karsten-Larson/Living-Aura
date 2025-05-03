import { Component, inject, Input, OnInit } from '@angular/core';
import { Product } from '../../shared/types/Product';
import { ProductService } from '../../product.service';
import { Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { CartService } from '../../cart.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product',
  imports: [CommonModule, FormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent implements OnInit {
  @Input({ required: true }) id!: string;

  product!: Product;

  productService = inject(ProductService);
  cartService = inject(CartService);

  router = inject(Router);
  location = inject(Location);

  quantity = '1'; // Must be a string for ngModel and select dropdown
  qtOptions!: number[];

  ngOnInit(): void {
    this.productService.getProductById(this.id).subscribe((product) => {
      if (product) {
        this.product = product;

        this.qtOptions = Array.from(
          { length: Math.min(10, this.product.stock) },
          (_, i) => i + 1
        );

        this.qtOptions = Array.from(
          { length: Math.min(10, this.product.stock) },
          (_, i) => i + 1
        );
      } else {
        this.router.navigate(['/products']);
      }
    });
  }

  /**
   * Navigates the user back to the previous page if there is a valid navigation history.
   * If no valid navigation history exists, redirects the user to the '/products' route.
   */
  goBack(): void {
    const state = this.location.getState() as { navigationId?: number };
    if (state && state.navigationId && state.navigationId > 1) {
      this.location.back();
    } else {
      this.router.navigate(['/products']);
    }
  }

  addToCart(): void {
    this.cartService.addToCart(this.product, Number(this.quantity));

    this.router.navigate(['/cart']);
  }
}
