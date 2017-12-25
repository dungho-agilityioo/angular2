import {
  NgModule,
  Optional,
  SkipSelf
} from '@angular/core';
import { HttpModule } from '@angular/http';

import { CommonModule } from '@angular/common';

import { LocalStorageService } from './services/local-storage.service';
import { HttpService } from './services/http.service';
import { ValidationService } from './services/validation.service';

import { moduleImportGuard } from './module-import-guard';
import { LoadingIndicatorComponent } from 'app/core/components/loading-indicator/loading-indicator.component';
import { NotificationComponent } from 'app/core/components/notification/notification.component';


const MODULES: any[] = [
  CommonModule,
  HttpModule
];

const COMPONENTS = [
  LoadingIndicatorComponent,
  NotificationComponent
];

const PROVIDERS: any[] = [
  HttpService,
  LocalStorageService,
  ValidationService
];

@NgModule({
  imports: [
    ...MODULES
  ],
  declarations: [
    ...COMPONENTS
  ],
  providers: [
    ...PROVIDERS
  ],
  exports: [
    ...COMPONENTS
  ]
})
export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    moduleImportGuard(parentModule, 'CoreModule');
  }
}
