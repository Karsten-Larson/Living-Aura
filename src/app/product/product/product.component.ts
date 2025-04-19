import { Component, inject, Input, OnInit } from '@angular/core';
import { Product } from '../../shared/types/Product';
import { ProductService } from '../../product.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../../cart.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent implements OnInit {
  @Input({ required: true, transform: (value: string) => Number(value) })
  id!: number;

  product!: Product;
  productService = inject(ProductService);
  cartService = inject(CartService);

  router = inject(Router);

  quantity = 1;

  ngOnInit(): void {
    this.productService.getProduct(this.id).subscribe((product) => {
      if (product) {
        this.product = product;
      } else {
        this.router.navigate(['/products']);
      }
    });
  }

  addToCart(): void {
    this.cartService.addToCart(this.product, this.quantity);
    alert('Product added to cart');
  }
}
