import {
  NgModule
} from '@angular/core';
import {
  RouterModule
} from '@angular/router';
import {
  ROUTES as productRouting
} from './product/product-routing.module';

export const COMMON_MODULES: any[] = [
];

export const ROUTES: any[] = [
  {
    path: '',
    children: [
      ...productRouting
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
