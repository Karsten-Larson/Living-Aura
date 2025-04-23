import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../product.service';
import { Product } from '../../shared/types/Product';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../cart.service';
import { ProductFilterComponent } from "../product-filter/product-filter.component";

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, FormsModule, ProductFilterComponent],
  standalone: true,
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent {
  cartService = inject(CartService);

  //this was used before adding the JSON...
  products = [
    //products = JSON.parse(localStorage.getItem('productStock') || '[]') || [
    {
      //img: '/assets/images/brownwoodenchair.jpg',
      name: 'Wooden Chair',
      description: 'Classic brown wooden chair',
      price: 100,
      id: 1,
      quantity: 5,
    },
    {
      //img: '/assets/images/chilllamp',
      name: 'Chill Lamp',
      description: 'Modern decorative lamp',
      price: 200,
      id: 2,
      quantity: 3,
    },
    {
      //img: '/assets/images/darkbrownwoodenchair.jpg',
      name: 'Dark Chair',
      description: 'Dark brown stylish chair',
      price: 300,
      id: 3,
      quantity: 2,
    },
    {
      //img: '/assets/images/headphones.jpg',
      name: 'Headphones',
      description: 'High-quality wireless headphones',
      price: 400,
      id: 4,
      quantity: 4,
    },
  ];

  constructor() {
    const saved = localStorage.getItem('productList');
    if (saved) {
      this.products = JSON.parse(saved);
    } else {
      localStorage.setItem('productList', JSON.stringify(this.products));
    }
  }

  addToCart(product: any) {
    //this.cartService.addToCart(product);
    // if (product.quantity > 0) {
    //   this.cartService.addToCart(product);
    //   product.quantity--;
    //   localStorage.setItem('productStock', JSON.stringify(this.products));
    // }
     if (product.quantity > 0) {
       product.quantity--;
       this.cartService.addToCart(product);
       localStorage.setItem('productList', JSON.stringify(this.products)); // save updated stock
     }
  }

  filterText = '';

  get filteredProducts() {
    return this.products.filter((product) =>
      product.name.toLowerCase().includes(this.filterText.toLowerCase())
    );
  }

  updateFilter(text: string) {
    this.filterText = text;
  }
}
