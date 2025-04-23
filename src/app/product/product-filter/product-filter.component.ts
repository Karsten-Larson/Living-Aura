import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-filter',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './product-filter.component.html',
  styleUrl: './product-filter.component.css',
})
export class ProductFilterComponent {
  @Output() filterChanged = new EventEmitter<string>();
  searchText = '';

  onSearch() {
    this.filterChanged.emit(this.searchText);
  }
}
