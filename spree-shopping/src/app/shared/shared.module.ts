import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormatUrlImagePipe } from './pipes/format-url-image.pipe';
import {TruncatePipe } from './pipes/truncate.pipe';
import { CartService } from './services/cart.service';
import { PaginationService } from './services/pagination.service';

import { PaginationComponent } from './components/pagination/pagination.component';
import { MainFooterComponent } from './components/main-footer/main-footer.component';
import { PrimaryLayoutComponent } from './components/main-layout/primary-layout.component';
import { MainHeaderComponent } from './components/main-header/main-header.component';
import { ControlMessagesComponent } from './components/control-messages/control-messages.component';
import { ProfileDropdownComponent } from './components/profile-dropdown/profile-dropdown.component';

const MODULES = [
  CommonModule,
  RouterModule
];
const COMPONENTS: any[] = [
  PrimaryLayoutComponent,
  MainHeaderComponent,
  MainFooterComponent,
  PaginationComponent,
  ControlMessagesComponent,
  ProfileDropdownComponent
];

const PIPES: any[] = [
  TruncatePipe,
  FormatUrlImagePipe
];

const PROVIDERS = [
  PaginationService,
  CartService
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
