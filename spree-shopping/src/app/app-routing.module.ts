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
    path: 'cart',
    children: [
      ...cartRouting
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
