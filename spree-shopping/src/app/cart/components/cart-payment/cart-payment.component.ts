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
  styleUrls: ['./cart-payment.component.css'],
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
    this.subscription = this.orderService.order$.subscribe( res => {
      if (!_.isEmpty(res)) {
        const order = res.json();

        this.orderTotal = {
          number: order.number,
          itemTotal: order.item_total,
          total: order.total,
          itemCount: order.total_quantity,
          taxTotal: order.tax_total
        };

        this.cd.markForCheck();
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
