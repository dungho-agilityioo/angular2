import {
  NgModule
} from '@angular/core';

import {
  SharedModule
} from 'app/shared/shared.module';
import {
  AddToCartComponent
} from './components/add-to-cart/add-to-cart.component';
import {
  ShoppingCartComponent
} from './components/shopping-cart/shopping-cart.component';

import {
  OrderService
} from 'app/order/services/order.service';
import {
  AddressModule
} from 'app/address/address.module';
import {
  PaymentModule
} from 'app/payment/payment.module';
import {
  CartAddressComponent
} from 'app/cart/components/cart-address/cart-address.component';
import {
  CartSummaryComponent
} from 'app/cart/components/cart-summary/cart-summary.component';
import {
  CartDeliveryComponent
} from './components/cart-delivery/cart-delivery.component';
import {
  CartPaymentComponent
} from './components/cart-payment/cart-payment.component';
import {
  CartHeaderComponent
} from 'app/cart/components/cart-header/cart-header.component';
import { AuthModule } from 'app/auth/auth.module';


const MODULES = [
  SharedModule,
  AddressModule,
  PaymentModule,
  AuthModule
];
const COMPONENTS: any[] = [
  AddToCartComponent,
  ShoppingCartComponent,
  CartAddressComponent,
  CartSummaryComponent,
  CartDeliveryComponent,
  CartPaymentComponent,
  CartHeaderComponent
];

const PROVIDERS = [
  OrderService
];

@NgModule({
  imports: [
    ...MODULES
  ],
  declarations: [
    ...COMPONENTS,
  ],
  providers: [
    ...PROVIDERS
  ],
  exports: [
    ...COMPONENTS
  ]
})
export class CartModule { }
