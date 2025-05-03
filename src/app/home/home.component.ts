import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductCardComponent } from '../product/product-card/product-card.component';
import { ProductService } from '../product.service';
import { Product } from '../shared/types/Product';
import { ProductListComponent } from '../product/product-list/product-list.component';

@Component({
  selector: 'app-home',
  imports: [RouterLink, ProductCardComponent, ProductListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  displayProducts!: Product[];
  productService = inject(ProductService);

  ngOnInit(): void {
    this.productService.getProducts().subscribe((products) => {
      this.displayProducts = products.slice();
    });
  }
}
