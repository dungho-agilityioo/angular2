import { Router } from '@angular/router';
import {
  Component,
  OnInit,
  Input,
  ChangeDetectorRef
} from '@angular/core';

import { OrderService } from 'app/order/services/order.service';
import { PaymentMode } from 'app/payment/models/payment-mode';
import { PaymentService } from 'app/payment/services/payment.service';
import { OrderTotal } from 'app/order/models/order-total.model';
import { LocalStorageService } from 'app/core/services/local-storage.service';
import * as userConfig from 'app/user/user-config';

@Component({
  selector: 'payment-mode',
  templateUrl: './payment-mode.component.html',
  styleUrls: ['./payment-mode.component.scss']
})
export class PaymentModeComponent implements OnInit {
  @Input() orderTotal: OrderTotal;

  selectdMode: PaymentMode = new PaymentMode();

  constructor(
    private orderService: OrderService,
    private paymentService: PaymentService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  /**
   * Create new payment for order and
   * Update order state to complete
   */
  makePayment() {
    this.orderService.availablePaymentMethods()
      .switchMap( (payment) => {
        const selectdMode = this.paymentService.getDefaultMode(payment.payment_methods);

        return this.orderService.createNewPayment(selectdMode.id, this.orderTotal.total);
      })
      .do(() => {
        // remove order caching
        this.localStorageService.removeOrder();
        // update current order
        this.orderService.getAndSetObservableOrder()
          .do(() => this.redirectToNewPage())
          .subscribe();
      })
      .subscribe();

  }

  private redirectToNewPage() {
    // if user login will redirect to owner order
    this.router.navigate([userConfig.PATH_NAME.USER_ORDER]);
  }

}
