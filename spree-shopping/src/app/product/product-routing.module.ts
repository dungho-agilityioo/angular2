import { ProductListPageComponent } from './components/product-list-page/product-list-page.component';
import { PrimaryLayoutComponent } from './../shared/components/main-layout/primary-layout.component';
import { HttpModule } from '@angular/http';
import {
  RouterModule,
  Routes
} from '@angular/router';
import { NgModule, Component } from '@angular/core';

export const ROUTES: Routes = [
  {
    path: '',
    component: PrimaryLayoutComponent,
    children: [
      {
        path: '',
        component: ProductListPageComponent
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
export class ProductRoutingModule {

}
