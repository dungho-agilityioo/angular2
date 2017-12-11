import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { ProductService } from './services/product.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HttpModule
  ],
  declarations: [
    ProductComponent
  ],
  providers: [
    ProductService
  ]
})
export class ProductModule { }
