import { OrderService } from 'app/order/services/order.service';
import { AddToCartComponent } from './components/add-to-cart/add-to-cart.component';
import { PaginationService } from './services/pagination.service';
import { PaginationComponent } from './components/pagination/pagination.component';
import { FormatUrlImagePipe } from './pipes/format-url-image.pipe';
import { TruncatePipe } from './pipes/truncate.pipe';
import { MainFooterComponent } from './components/main-footer/main-footer.component';
import { PrimaryLayoutComponent } from './components/main-layout/primary-layout.component';
import { MainHeaderComponent } from './components/main-header/main-header.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

const MODULES = [
  CommonModule,
  RouterModule
];
const COMPONENTS: any[] = [
  PrimaryLayoutComponent,
  MainHeaderComponent,
  MainFooterComponent,
  PaginationComponent,
  AddToCartComponent
];

const PIPES: any[] = [
  TruncatePipe,
  FormatUrlImagePipe
];

const PROVIDERS = [
  PaginationService,
  OrderService
];

@NgModule({
  imports: [
    ...MODULES
  ],
  declarations: [
    ...COMPONENTS,
    ...PIPES
] ,
  exports: [
    CommonModule,
    ...COMPONENTS,
    ...PIPES
  ],
  providers: [
    ...PROVIDERS
  ]
})
export class SharedModule { }
