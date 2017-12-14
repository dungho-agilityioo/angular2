import {
  NgModule
} from '@angular/core';
import {
  RouterModule
} from '@angular/router';


import {
  SharedModule
} from 'app/shared/shared.module';
import {
  CategoryModule
} from 'app/category/category.module';
import {
  OrderModule
} from 'app/order/order.module';

import {
  OrderService
} from './../order/services/order.service';
import {
  ProductService
} from './services/product.service';

import {
  ProductListPageComponent
} from './components/product-list-page/product-list-page.component';

const MODULES: any[] = [
  RouterModule,
  CategoryModule,
  SharedModule,
  OrderModule
];

const COMPONENTS: any[] = [
  ProductListPageComponent
];

const PROVIDERS: any[] = [
  ProductService,
  OrderService
];

@NgModule({
  imports: [
    ...MODULES
  ],
  declarations: [
    ...COMPONENTS
  ],
  providers: [
    ...PROVIDERS
  ]
})
export class ProductModule { }
