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
  ProductListPageComponent
} from './components/product-list-page/product-list-page.component';
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
        component: ProductListPageComponent
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
export class ProductRoutingModule {}
