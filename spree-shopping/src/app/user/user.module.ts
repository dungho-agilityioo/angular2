import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import {
  NgModule
} from '@angular/core';

import { UserService } from './services/user.service';
import { OrderModule } from 'app/order/order.module';

const MODULES = [
  OrderModule
];

const COMPONENTS = [
  MyOrdersComponent
];

const PROVIDERS = [
  UserService
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
  ]
})
export class UserModule { }
