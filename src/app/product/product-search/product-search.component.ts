import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-search',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './product-search.component.html',
  styleUrl: './product-search.component.css',
})
export class ProductSearchComponent {
  @Output() searchChanged = new EventEmitter<string>();
  searchText = '';

  onSearch() {
    this.searchChanged.emit(this.searchText);
  }
}
