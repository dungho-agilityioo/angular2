import {
  NgModule,
  Component
} from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';
import { HttpModule } from '@angular/http';

import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';

import { PrimaryLayoutComponent } from 'app/shared/components/main-layout/primary-layout.component';
import { CartAddressComponent } from 'app/cart/components/cart-address/cart-address.component';
import { CartDeliveryComponent } from './components/cart-delivery/cart-delivery.component';
import { CartPaymentComponent } from './components/cart-payment/cart-payment.component';
import { AuthGuardService} from 'app/auth/services/auth-guard.service';
import * as cartConfig from './cart-config';

export const ROUTES: Routes = [
  {
    path: '',
    component: PrimaryLayoutComponent,
    children: [
      {
        path: cartConfig.PATH_NAME.CHECKOUT_CART,
        component: ShoppingCartComponent
      }
    ]
  },
  {
    path: '',
    component: PrimaryLayoutComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: cartConfig.PATH_NAME.CHECKOUT_ADDRESS,
        component: CartAddressComponent
      }
    ]
  },
  {
    path: '',
    component: PrimaryLayoutComponent,
    children: [
      {
        path: cartConfig.PATH_NAME.CHECKOUT_DELIVERY,
        component: CartDeliveryComponent
      }
    ]
  },
  {
    path: '',
    component: PrimaryLayoutComponent,
    children: [
      {
        path: cartConfig.PATH_NAME.CHECKOUT_PAYMENT,
        component: CartPaymentComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(ROUTES)
  ],
  exports: [
    RouterModule
  ]
})
export class CartRoutingModule {}
