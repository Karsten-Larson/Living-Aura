import { Routes } from '@angular/router';
import { AddressFormComponent } from './checkout/address-form/address-form.component';
import { OrderFormComponent } from './checkout/order-form/order-form.component';
import { ProductsComponent } from './product/products/products.component';
import { ProductComponent } from './product/product/product.component';
import { HomeComponent } from './home/home.component';
import { AccountComponent } from './account/account/account.component';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { CartPageComponent } from './cart/cart-page/cart-page.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { CheckoutComponent } from './checkout/checkout/checkout.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

export const routes: Routes = [
  { path: 'cart', component: CartPageComponent },
  { path: 'checkout/address', component: AddressFormComponent },
  { path: 'checkout/order', component: OrderFormComponent },
  { path: '', component: HomeComponent },
  { path: 'profile', component: AccountComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'product/:id', component: ProductComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'about', component: AboutComponent },
  { path: 'checkout', component: CheckoutComponent },
  {path: 'forgot-password', component: ForgotPasswordComponent,
  },
];
