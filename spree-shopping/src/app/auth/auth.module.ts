import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SignInComponent } from 'app/auth/components/sign-in/sign-in.component';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { SignUpComponent } from 'app/auth/components/sign-up/sign-up.component';

const MODULES = [
  FormsModule,
  SharedModule,
  ReactiveFormsModule
];
const COMPONENTS: any[] = [
  SignInComponent,
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
