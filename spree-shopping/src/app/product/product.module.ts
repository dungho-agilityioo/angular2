import { OrderModule } from 'app/order/order.module';
import { ProductListPageComponent } from './components/product-list-page/product-list-page.component';
import { SharedModule } from 'app/shared/shared.module';
import { CategoryModule } from 'app/category/category.module';
import { RouterModule } from '@angular/router';
import { ProductService } from './services/product.service';
import { NgModule } from '@angular/core';

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
  ProductService
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
