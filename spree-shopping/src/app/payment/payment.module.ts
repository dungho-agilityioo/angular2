
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentModeComponent } from './payment-mode.component';
import { PaymentService } from 'app/payment/services/payment.service';

const MODULES = [
  CommonModule
];
const COMPONENTS = [
  PaymentModeComponent
];
const PROVIDERS = [
  PaymentService
];

@NgModule({
  imports: [
    ...MODULES
  ],
  declarations: [
    ...COMPONENTS
  ],
  exports: [
    ...COMPONENTS
  ]
})

export class PaymentModule { }
