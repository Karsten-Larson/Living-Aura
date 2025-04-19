import { Component, Input } from '@angular/core';
import { Product } from '../../shared/types/Product';
import { ProductCardComponent } from '../product-card/product-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, ProductCardComponent],
  standalone: true,
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent {
  @Input() products!: Product[];
}
