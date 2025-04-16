import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-address-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './address-form.component.html',
  styleUrl: './address-form.component.css',
})
export class AddressFormComponent {
  address = {
    fullName: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    country: '',
  };

  constructor(private router: Router) {}

  submitAddress(): void {
    localStorage.setItem('shippingAddress', JSON.stringify(this.address));
    this.router.navigate(['/checkout/order']);
  }
}
