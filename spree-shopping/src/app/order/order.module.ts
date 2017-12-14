import {
  NgModule
} from '@angular/core';

import {
  OrderService
} from './services/order.service';

const PROVIDERS: any[] = [
  OrderService
];

@NgModule({
  imports: [
  ],
  declarations: [
  ],
  providers: [
    ...PROVIDERS
  ]
})
export class OrderModule { }
