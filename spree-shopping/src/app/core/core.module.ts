import { HttpService } from './services/http.service';
import { ProductService } from './../product/services/product.service';
import { HttpModule } from '@angular/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { moduleImportGuard } from './module-import-guard';

const MODULES: any[] = [
  CommonModule,
  HttpModule
];

const PROVIDERS: any[] = [
  HttpService
];

@NgModule({
  imports: [
    ...MODULES
  ],
  declarations: [
  ],
  providers: [
    ...PROVIDERS
  ]
})
export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    moduleImportGuard(parentModule, 'CoreModule');
  }
}
