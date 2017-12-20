
import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { FormsModule } from '@angular/forms';

import { LoginFormComponent } from 'app/auth/components/login/login-form.component';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { SignUpComponent } from 'app/auth/components/sign-up/sign-up.component';

const MODULES = [
  FormsModule,
  SharedModule
];
const COMPONENTS: any[] = [
  LoginFormComponent,
  SignUpComponent
];

const PROVIDERS = [
  AuthService,
  AuthGuardService
];

@NgModule({
  imports: [
    ...MODULES
  ],
  declarations: [
    ...COMPONENTS,
  ],
  providers: [
    ...PROVIDERS
  ],
  exports: [
    ...COMPONENTS
  ]
})
export class AuthModule { }
