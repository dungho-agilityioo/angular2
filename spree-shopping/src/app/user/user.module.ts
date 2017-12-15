import {
  NgModule
} from '@angular/core';
import {
  UserComponent
} from './user.component';

const COMPONENTS = [
  UserComponent
];

@NgModule({
  imports: [
  ],
  declarations: [
    ...COMPONENTS
  ]
})
export class UserModule { }
