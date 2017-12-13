import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { ProductModule } from './product/product.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpModule, Http } from '@angular/http';

const MODULES = [
  BrowserModule,
  ProductModule,
  CoreModule,
  AppRoutingModule
];

const COMPONENTS = [
  AppComponent
];

@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    ...MODULES
  ],
  providers: [],
  bootstrap: [
    ...COMPONENTS
  ]
})
export class AppModule { }
