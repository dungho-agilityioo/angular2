import {
  NgModule, Component
} from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';
import {
  HttpModule
} from '@angular/http';

import {
  ShoppingCartComponent
} from './components/shopping-cart/shopping-cart.component';

import {
  PrimaryLayoutComponent
} from 'app/shared/components/main-layout/primary-layout.component';

export const ROUTES: Routes = [
  {
    path: '',
    component: PrimaryLayoutComponent,
    children: [
      {
        path: '',
        component: ShoppingCartComponent
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
