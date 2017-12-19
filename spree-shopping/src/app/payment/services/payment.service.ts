import { Injectable } from '@angular/core';
import { PaymentMode } from 'app/payment/models/payment-mode';

@Injectable()
export class PaymentService {

  constructor() { }

  /**
   * Get default payment mode
   * @param modes
   */
  getDefaultMode(modes): PaymentMode {
    let selectedMode;
    modes.forEach((mode) => {
      if ( mode.name === 'Check' ) {
        selectedMode = mode;
      }
    });
    return selectedMode;
  }
}
