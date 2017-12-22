import {
  NgModule
} from '@angular/core';

import {
  OrderService
} from './services/order.service';
import {
  OrderListComponent
} from './components/order-list/order-list.component';
import {
  OrderDetailsComponent
} from 'app/order/components/order-details/order-details.component';
import {
  SharedModule
} from 'app/shared/shared.module';

const MODULES = [
  SharedModule
];
const PROVIDERS: any[] = [
  OrderService
];
const COMPONENTS = [
  OrderListComponent,
  OrderDetailsComponent
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
