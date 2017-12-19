import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { FormsModule } from '@angular/forms';

import { LoginComponent } from 'app/auth/components/login/login.component';
import { AuthService } from './services/auth.service';
import { SignUpComponent } from 'app/auth/components/sign-up/sign-up.component';

const MODULES = [
  FormsModule,
  SharedModule
];
const COMPONENTS: any[] = [
  LoginComponent,
  SignUpComponent
];

const PROVIDERS = [
  AuthService
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
