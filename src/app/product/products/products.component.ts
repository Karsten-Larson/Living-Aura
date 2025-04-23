import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../product.service';
import { Product } from '../../shared/types/Product';
import { ProductListComponent } from '../product-list/product-list.component';
import { FormsModule } from '@angular/forms';
import { CartComponent } from '../../cart/cart/cart.component';

@Component({
  selector: 'app-products',
  imports: [FormsModule, ProductListComponent, CartComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  products!: Product[];

  productService = inject(ProductService);

  ngOnInit() {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
    });
  }
}
