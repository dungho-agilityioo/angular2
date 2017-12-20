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
  LoginFormComponent
} from 'app/auth/components/login/login-form.component';

export const ROUTES: Routes = [
  {
    path: '',
    component: PrimaryLayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginFormComponent
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
