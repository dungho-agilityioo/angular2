import { HttpService } from './services/http.service';
import { ProductService } from './../product/services/product.service';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreComponent } from './core.component';

@NgModule({
  imports: [
    CommonModule,
    HttpModule
  ],
  declarations: [
    CoreComponent
  ],
  providers: [
    HttpService
  ]
})
export class CoreModule { }
