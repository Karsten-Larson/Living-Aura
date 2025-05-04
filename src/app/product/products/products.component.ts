import { Component, inject, OnInit, signal, Signal } from '@angular/core';
import { ProductService } from '../../product.service';
import { Product } from '../../shared/types/Product';
import { ProductListComponent } from '../product-list/product-list.component';
import { FormsModule } from '@angular/forms';
import { CartComponent } from '../../cart/cart/cart.component';
import { ProductFilterComponent } from '../product-filter/product-filter.component';
import { ProductSearchComponent } from '../product-search/product-search.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-products',
  imports: [
    FormsModule,
    ProductListComponent,
    CartComponent,
    ProductFilterComponent,
    ProductSearchComponent,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  products = signal<Product[]>([]);

  searchText: string | null = null;
  category: string | null = null;

  productService = inject(ProductService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.searchText = params['search'] || null;
      this.category = params['category'] || null;
      this.filter();
    });
  }

  searchEvent(searchText: string) {
    this.searchText = searchText;

    this.filter();

    this.router.navigate(['/products'], {
      queryParams: { search: searchText, category: this.category },
    });
  }

  categoryEvent(tag: string | null) {
    this.category = tag;

    this.router.navigate(['/products'], {
      queryParams: { search: this.searchText, category: tag },
    });

    this.filter();
  }

  filter() {
    this.productService.getProducts().subscribe((products) => {
      this.products.set(
        products.filter((product) => {
          const matchesSearch = this.searchText
            ? product.title
                .toLowerCase()
                .includes(this.searchText.trim().toLowerCase())
            : true;
          const matchesCategory = this.category
            ? product.category === this.category
            : true;
          return matchesSearch && matchesCategory;
        })
      );
    });
  }
}
