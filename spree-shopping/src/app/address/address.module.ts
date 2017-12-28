import { NgModule } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { Select2Component } from 'angular-select2-component';

import { AddressComponent } from './address.component';
import { SharedModule } from 'app/shared/shared.module';
import { OrderService } from 'app/order/services/order.service';
import { AddressService } from './services/address.service';


const MODULES = [
  SharedModule,
  FormsModule,
  ReactiveFormsModule
];
const COMPONENTS: any[] = [
  AddressComponent,
  Select2Component
];

const PROVIDERS = [
  OrderService,
  AddressService
];

@NgModule({
  imports: [
    ...MODULES
  ],
  declarations: [
    ...COMPONENTS
  ],
  exports: [
    COMPONENTS
  ],
  providers: [
    ...PROVIDERS
  ]
})
export class AddressModule { }
