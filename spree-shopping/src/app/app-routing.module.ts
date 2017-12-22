import {
  NgModule
} from '@angular/core';
import {
  RouterModule
} from '@angular/router';

import {
  ROUTES as productRouting
} from 'app/product/product-routing.module';
import {
  ROUTES as cartRouting
} from 'app/cart/cart-routing.module';
import {
  ROUTES as authRouting
} from 'app/auth/auth-routing.module';
import {
  ROUTES as addressRouting
} from 'app/address/address-routing.module';
import {
  ROUTES as userRouting
} from 'app/user/user-routing.module';

export const COMMON_MODULES: any[] = [
];

export const ROUTES: any[] = [
  {
    path: '',
    children: [
      ...productRouting
    ]
  },
  {
    path: '',
    children: [
      ...cartRouting
    ]
  },
  {
    path: '',
    children: [
      ...authRouting
    ]
  },
  {
    path: '',
    children: [
      ...userRouting
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(ROUTES, { useHash: false }),
    ...COMMON_MODULES
  ],
  exports: [
    RouterModule,
    ...COMMON_MODULES
  ]
})
export class AppRoutingModule { }
