import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';
import { AddressComponent } from 'app/address/address.component';
import { PrimaryLayoutComponent } from 'app/shared/components/main-layout/primary-layout.component';

export const ROUTES: Routes = [
  {
    path: '',
    component: PrimaryLayoutComponent,
    children: [{
      path: '',
      component: AddressComponent
    }]
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
export class AddressRoutingModule { }
