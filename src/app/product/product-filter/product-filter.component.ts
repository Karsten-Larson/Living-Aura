import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-filter',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './product-filter.component.html',
  styleUrl: './product-filter.component.css',
})
export class ProductFilterComponent implements OnInit {
  @Output() filterChanged = new EventEmitter<string | null>();
  tag = 'Select a category';

  productService = inject(ProductService);

  categories: string[] = [];

  ngOnInit() {
    this.productService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  onFilter() {
    this.filterChanged.emit(this.tag === 'Select a category' ? null : this.tag);
  }
}
