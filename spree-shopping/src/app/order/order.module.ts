
import {
  NgModule
} from '@angular/core';
import {
  CommonModule
} from '@angular/common';

import {
  OrderService
} from './services/order.service';
import {
  OrderListComponent
} from './components/order-list/order-list.component';

const MODULES = [
  CommonModule
];
const PROVIDERS: any[] = [
  OrderService
];
const COMPONENTS = [
  OrderListComponent
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
  ],
  exports: [
    ...COMPONENTS
  ]
})
export class OrderModule { }
