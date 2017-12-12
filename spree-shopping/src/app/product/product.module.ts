import { ProductListPageComponent } from './components/product-list-page/product-list-page.component';
import { SharedModule } from './../shared/shared.module';
import { CategoryModule } from './../category/category.module';
import { RouterModule } from '@angular/router';
import { ProductService } from './services/product.service';
import { NgModule } from '@angular/core';

const MODULES: any[] = [
  RouterModule,
  CategoryModule,
  SharedModule
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
