import { Subscription } from 'rxjs/Subscription';
import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectorRef
} from '@angular/core';

import * as _ from 'lodash';

import { OrderService } from 'app/order/services/order.service';
import { OrderTotal } from 'app/order/models/order-total.model';
import { PaymentService } from 'app/payment/services/payment.service';

@Component({
  selector: 'app-cart-payment',
  templateUrl: './cart-payment.component.html',
  styleUrls: ['./cart-payment.component.scss'],
  providers: [PaymentService]
})
export class CartPaymentComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  orderTotal: OrderTotal;

  constructor(
    private orderService: OrderService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.subscription = this.orderService.order$.subscribe( order => {
      if (!_.isEmpty(order) && !order.error) {
        this.orderTotal = {
          number: order.number,
          itemTotal: order.itemTotal,
          total: order.total,
          itemCount: order.totalQuantity,
          taxTotal: order.taxTotal
        };

        this.cd.markForCheck();
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
