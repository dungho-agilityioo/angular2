
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

const MODULES = [
  SharedModule
];
const COMPONENTS: any[] = [
  AddToCartComponent,
  ShoppingCartComponent
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
