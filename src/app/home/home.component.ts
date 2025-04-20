import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductCardComponent } from '../product/product-card/product-card.component';
import { ProductService } from '../product.service';
import { Product } from '../shared/types/Product';

@Component({
  selector: 'app-home',
  imports: [RouterLink, ProductCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  displayProducts!: Product[];
  productService = inject(ProductService);

  ngOnInit(): void {
    this.productService.getProducts().subscribe((products) => {
      this.displayProducts = products.slice(0, 2);
    });
  }
}
