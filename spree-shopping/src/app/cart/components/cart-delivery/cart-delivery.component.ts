import {
  Component,
  OnInit,
  ChangeDetectorRef,
  OnDestroy
} from '@angular/core';
import {  Router } from '@angular/router';
import 'rxjs/add/operator/do';
import { Subscription } from 'rxjs/Subscription';

import * as _ from 'lodash';

import { OrderService } from 'app/order/services/order.service';
import { Address } from 'app/address/models/address';
import { OrderTotal } from 'app/order/models/order-total.model';
import * as cartConfig from 'app/cart/cart-config';

@Component({
  selector: 'cart-delivery',
  templateUrl: './cart-delivery.component.html',
  styleUrls: ['./cart-delivery.component.scss']
})
export class CartDeliveryComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  shippingAddress: Address;
  orderState: String;
  orderTotal: OrderTotal;

  constructor(
    private orderService: OrderService,
    private cd: ChangeDetectorRef,
    private router: Router
  ) { }

  ngOnInit() {
    this.subscription = this.orderService.order$.subscribe( res => {
      if (!_.isEmpty(res)) {
        const order = res.json();
        this.shippingAddress = order.ship_address;
        this.orderState = order.state;

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

  /**
   * Update order state to complete
   */
  onDelivery() {
    if (this.orderState === 'delivery' || this.orderState === 'address') {
      this.orderService.changeOrderState()
        .do(() => {
          this.router.navigate([cartConfig.PATH_NAME.CHECKOUT_PAYMENT]);
        })
        .subscribe();
    } else {
      this.router.navigate([cartConfig.PATH_NAME.CHECKOUT_PAYMENT]);
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
