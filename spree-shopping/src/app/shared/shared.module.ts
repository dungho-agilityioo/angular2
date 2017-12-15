import {
  RouterModule
} from '@angular/router';
import {
  NgModule
} from '@angular/core';
import {
  CommonModule
} from '@angular/common';


import {
  FormatUrlImagePipe
} from './pipes/format-url-image.pipe';
import {
  TruncatePipe
} from './pipes/truncate.pipe';

import {
  OrderService
} from 'app/order/services/order.service';
import {
  PaginationService
} from './services/pagination.service';

import {
  PaginationComponent
} from './components/pagination/pagination.component';

import {
  MainFooterComponent
} from './components/main-footer/main-footer.component';
import {
  PrimaryLayoutComponent
} from './components/main-layout/primary-layout.component';
import {
  MainHeaderComponent
} from './components/main-header/main-header.component';


const MODULES = [
  CommonModule,
  RouterModule
];
const COMPONENTS: any[] = [
  PrimaryLayoutComponent,
  MainHeaderComponent,
  MainFooterComponent,
  PaginationComponent
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
    ...MODULES,
    ...COMPONENTS,
    ...PIPES
  ],
  providers: [
    ...PROVIDERS
  ]
})
export class SharedModule { }
