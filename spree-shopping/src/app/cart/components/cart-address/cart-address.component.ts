import { Subscription } from 'rxjs/Subscription';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnDestroy
} from '@angular/core';

import * as _ from 'lodash';

import {
  OrderService
} from 'app/order/services/order.service';
import {
  OrderTotal
} from 'app/order/models/order-total.model';

@Component({
  selector: 'cart-address',
  templateUrl: './cart-address.component.html',
  styleUrls: ['./cart-address.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartAddressComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  orderTotal: OrderTotal;

  constructor(
    private orderService: OrderService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {

    this.subscription = this.orderService.order$.subscribe(res => {
      if (!_.isEmpty(res)) {
        const order = res.json();
        this.orderTotal = {
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
