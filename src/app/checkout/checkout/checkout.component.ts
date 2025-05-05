import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../cart.service';
import { CartItem } from '../../shared/types/CartItem';
import { AddressFormComponent } from '../address-form/address-form.component';
import { Address } from '../../shared/types/Address';
import { AuthService } from '../../auth.service';
import { Card } from '../../shared/types/Card';
import { Firestore, addDoc, collection, doc } from '@angular/fire/firestore';

@Component({
  selector: 'app-checkout',
  imports: [CommonModule, FormsModule, AddressFormComponent],
  standalone: true,
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
  cartService = inject(CartService);
  authService = inject(AuthService);
  router = inject(Router);

  private firestore = inject(Firestore);
  private ordersCollection = collection(this.firestore, 'orders');

  items!: CartItem[];
  total = 0;

  shippingAddress: Address = {
    firstName: this.authService.user()?.displayName?.split(' ')[0] || '',
    lastName: this.authService.user()?.displayName?.split(' ')[1] || '',
    email: this.authService.user()?.email || '',
    address: '',
    city: '',
    state: '',
    zip: '',
  };
  billingAddress: Address = {
    firstName: this.authService.user()?.displayName?.split(' ')[0] || '',
    lastName: this.authService.user()?.displayName?.split(' ')[1] || '',
    email: this.authService.user()?.email || '',
    address: '',
    city: '',
    state: '',
    zip: '',
  };

  paymentInfo: Card = {
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  };

  shippingSameAsBilling = false;

  ngOnInit(): void {
    this.items = this.cartService.cartItems();
    this.total = this.cartService.total();

    if (this.items.length === 0) {
      this.router.navigate(['/products']);
    }
  }

  isValidAddress(address: Address): boolean {
    return (
      address.firstName.trim() !== '' &&
      address.lastName.trim() !== '' &&
      address.email.trim() !== '' &&
      address.address.trim() !== '' &&
      address.city.trim() !== '' &&
      address.state.trim() !== '' &&
      address.zip.trim() !== ''
    );
  }

  isValidPaymentInfo(paymentInfo: Card): boolean {
    return (
      paymentInfo.cardNumber.trim() !== '' &&
      paymentInfo.cardName.trim() !== '' &&
      paymentInfo.expiryDate.trim() !== '' &&
      paymentInfo.cvv.trim() !== ''
    );
  }

  isValidForm(): boolean {
    return (
      this.isValidAddress(this.shippingAddress) &&
      (this.shippingSameAsBilling ||
        this.isValidAddress(this.billingAddress)) &&
      this.isValidPaymentInfo(this.paymentInfo)
    );
  }

  async placeOrder(): Promise<void> {
    if (!this.isValidForm()) {
      alert('Please fill in all required fields.');
      return;
    }

    try {
      const shippingAddressRef = await addDoc(
        collection(this.firestore, 'addresses'),
        this.shippingAddress
      );
      const billingAddressRef = this.shippingSameAsBilling
        ? shippingAddressRef
        : await addDoc(
            collection(this.firestore, 'addresses'),
            this.billingAddress
          );

      const paymentInfoRef = await addDoc(
        collection(this.firestore, 'card'),
        this.paymentInfo
      );

      const orderItems = this.items.map((item) => ({
        product: doc(this.firestore, 'products', item.product.id),
        quantity: item.quantity,
      }));

      const order = {
        orderitems: orderItems,
        total: this.total,
        shippingAddress: doc(
          this.firestore,
          'addresses',
          shippingAddressRef.id
        ),
        billingAddress: doc(this.firestore, 'addresses', billingAddressRef.id),
        paymentInfo: doc(this.firestore, 'card', paymentInfoRef.id),
        userId: this.authService.user()?.uid || null,
        userEmail: this.authService.user()?.email || null,
        orderDate: new Date().toISOString(),
      };

      await addDoc(this.ordersCollection, order);

      alert('Order placed successfully!');
      this.cartService.clearCart();
      this.router.navigate(['/checkout/thank-you']);
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    }
  }
}
