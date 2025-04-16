import { Routes } from '@angular/router';
import { CartComponent } from './cart/cart/cart.component';
import { AddressFormComponent } from './checkout/address-form/address-form.component';
import { OrderFormComponent } from './checkout/order-form/order-form.component';



export const routes: Routes = [
  { path: 'cart', component: CartComponent },
  { path: 'checkout/address', component: AddressFormComponent },
  { path: 'checkout/order', component: OrderFormComponent },
  { path: '', redirectTo: '/cart', pathMatch: 'full' },
];

