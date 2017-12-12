import { ProductListPageComponent } from './components/product-list-page/product-list-page.component';
import { SharedModule } from './../shared/shared.module';
import { CategoryModule } from './../category/category.module';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { ProductService } from './services/product.service';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    RouterModule,
    HttpModule,
    CategoryModule,
    SharedModule
  ],
  declarations: [
    ProductListPageComponent
],
  providers: [
    ProductService
  ]
})
export class ProductModule { }
