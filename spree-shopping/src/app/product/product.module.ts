import {  NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { CategoryModule } from 'app/category/category.module';
import { OrderModule } from 'app/order/order.module';
import { CartModule } from 'app/cart/cart.module';

import { OrderService } from 'app/order/services/order.service';
import { ProductService } from './services/product.service';
import { ProductListPageComponent } from './components/product-list-page/product-list-page.component';
import { ProductDetailsPageComponent } from './components/product-details-page/product-details-page.component';
import { ProductPropertyComponent } from './components/product-property/product-property.component';
import { ProductImagesComponent } from './components/product-images/product-images.component';

const MODULES: any[] = [
  CategoryModule,
  SharedModule,
  OrderModule,
  CartModule
];

const COMPONENTS: any[] = [
  ProductListPageComponent,
  ProductDetailsPageComponent,
  ProductImagesComponent,
  ProductPropertyComponent
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
