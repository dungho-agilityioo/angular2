import {
  NgModule
} from '@angular/core';

import { UserService } from './services/user.service';
import { OrderModule } from 'app/order/order.module';

import { UserComponent } from './user.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { SidebarComponent } from './components/side-bar/side-bar.component';
import { MyOrderDetailsComponent } from './components/my-order-details/my-order-details.component';
import { SharedModule } from 'app/shared/shared.module';



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
