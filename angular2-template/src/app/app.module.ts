import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup
} from '@angular/forms';
import {
  RouterModule,
  Routes
} from '@angular/router';

import { AppComponent } from './app.component';
import { FormLoginComponent } from './form-login/form-login.component';
import { FormLoginBuilderComponent } from './form-login-builder/form-login-builder.component';
import { FormUserNestedComponent } from './form-user-nested/form-user-nested.component';
import { FormAddressComponent } from './form-address/form-address.component';
import { FormSignupComponent } from './form-signup/form-signup.component';

const appRoutes: Routes = [
  { path: 'forms', component: FormLoginComponent },
  { path: 'forms-builder', component: FormLoginBuilderComponent },
  { path: 'forms-nested', component: FormUserNestedComponent },
  { path: 'forms-group', component: FormSignupComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    FormLoginComponent,
    FormLoginBuilderComponent,
    FormUserNestedComponent,
    FormAddressComponent,
    FormSignupComponent
],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
