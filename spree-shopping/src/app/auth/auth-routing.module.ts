import {
  NgModule,
  Component
} from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';
import {
  HttpModule
} from '@angular/http';
import {
  PrimaryLayoutComponent
} from 'app/shared/components/main-layout/primary-layout.component';
import {
  SignUpComponent
} from 'app/auth/components/sign-up/sign-up.component';
import {
  SignInComponent
} from 'app/auth/components/sign-in/sign-in.component';

export const ROUTES: Routes = [
  {
    path: '',
    component: PrimaryLayoutComponent,
    children: [
      {
        path: 'login',
        component: SignInComponent
      },
      {
        path: 'signup',
        component: SignUpComponent
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
export class AuthRoutingModule {}
