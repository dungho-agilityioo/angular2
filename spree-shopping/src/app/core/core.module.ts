import { HttpService } from './services/http.service';
import { ProductService } from './../product/services/product.service';
import { HttpModule } from '@angular/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreComponent } from './core.component';
import { throwIfAlreadyLoaded } from './module-import-guard';

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
export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
