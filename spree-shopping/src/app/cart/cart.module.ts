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
  CartAddressComponent
} from 'app/cart/components/cart-address/cart-address.component';
import {
  CartSummaryComponent
} from 'app/cart/components/cart-summary/cart-summary.component';
import {
  CartDeliveryComponent
} from './components/cart-delivery/cart-delivery.component';

const MODULES = [
  SharedModule,
  AddressModule
];
const COMPONENTS: any[] = [
  AddToCartComponent,
  ShoppingCartComponent,
  CartAddressComponent,
  CartSummaryComponent,
  CartDeliveryComponent
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
