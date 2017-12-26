import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnDestroy
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import * as _ from 'lodash';

import { OrderService } from 'app/order/services/order.service';
import { OrderTotal } from 'app/order/models/order-total.model';


@Component({
  selector: 'main-cart',
  templateUrl: './main-cart.component.html',
  styleUrls: ['./main-cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainCartComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  orderTotal: OrderTotal;

  constructor(
    private orderService: OrderService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.subscription = this.orderService.order$.subscribe(res => {
      if (!_.isEmpty(res)) {
        const order = res.json();

        if ( !order.errors ) {
          this.orderTotal = {
            itemTotal: order.item_total,
            total: order.total,
            itemCount: order.total_quantity,
            taxTotal: order.tax_total
          };
          this.cd.markForCheck();
        }
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
