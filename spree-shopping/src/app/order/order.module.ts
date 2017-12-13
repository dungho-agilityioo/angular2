import { OrderService } from './services/order.service';
import { NgModule } from '@angular/core';

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
