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

export const ROUTES: Routes = [
  {
    path: '',
    component: PrimaryLayoutComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: 'user/order',
        component: MyOrdersComponent
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
