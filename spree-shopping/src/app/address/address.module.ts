import {
  NgModule
} from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';

import {
  AddressComponent
} from './address.component';
import {
  SharedModule
} from 'app/shared/shared.module';
import {
  OrderService
} from 'app/order/services/order.service';
import {
  AddressService
} from './services/address.service';
import {
  AddressConfigService
} from './services/address-config.service';


const MODULES = [
  SharedModule,
  FormsModule,
  ReactiveFormsModule
];
const COMPONENTS: any[] = [
  AddressComponent
];

const PROVIDERS = [
  OrderService,
  AddressService,
  AddressConfigService
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
