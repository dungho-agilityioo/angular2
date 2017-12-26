import {
  NgModule
} from '@angular/core';


import {
  OrderModule
} from 'app/order/order.module';
import {
  SharedModule
} from 'app/shared/shared.module';

import {
  UserComponent
} from './user.component';
import {
  MyOrdersComponent
} from './components/my-orders/my-orders.component';
import {
  SidebarComponent
} from './components/side-bar/side-bar.component';
import {
  MyOrderDetailsComponent
} from './components/my-order-details/my-order-details.component';
import {
  OrderService
} from 'app/order/services/order.service';

const MODULES = [
  OrderModule,
  SharedModule
];

const COMPONENTS = [
  MyOrdersComponent,
  SidebarComponent,
  UserComponent,
  MyOrderDetailsComponent
];

const PROVIDERS = [
  OrderService
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
