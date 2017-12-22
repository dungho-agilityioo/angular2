import {
  NgModule, Component
} from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';
import {
  HttpModule
} from '@angular/http';

import {
  AuthGuardService
} from 'app/auth/services/auth-guard.service';
import {
  PrimaryLayoutComponent
} from 'app/shared/components/main-layout/primary-layout.component';
import {
  MyOrdersComponent
} from './components/my-orders/my-orders.component';
import {
  MyOrderDetailsComponent
} from './components/my-order-details/my-order-details.component';
import {
  UserConfigService
} from 'app/user/services/user-config.service';

const userConfig: UserConfigService = new UserConfigService();
export const ROUTES: Routes = [
  {
    path: '',
    component: PrimaryLayoutComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: userConfig.PATH_NAME.USER_ORDER,
        component: MyOrdersComponent
      },
      {
        path: 'user/order/:number/:token',
        component: MyOrderDetailsComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(ROUTES)
  ],
  exports: [
    RouterModule
  ]
})
export class UserRoutingModule {}
