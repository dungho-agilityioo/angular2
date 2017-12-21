
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule, Http } from '@angular/http';

import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { AppRoutingModule } from './app-routing.module';
import { AddressModule } from './address/address.module';
import { UserModule } from './user/user.module';
import { CoreModule } from './core/core.module';


const MODULES = [
  BrowserModule,
  ProductModule,
  AuthModule,
  CoreModule,
  AppRoutingModule,
  AddressModule,
  UserModule
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
