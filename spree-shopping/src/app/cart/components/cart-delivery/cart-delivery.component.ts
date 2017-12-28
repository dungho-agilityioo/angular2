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
import { Address } from 'app/address/models/address.model';
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
  checkoutAddressUrl: string;

  constructor(
    private orderService: OrderService,
    private cd: ChangeDetectorRef,
    private router: Router
  ) { }

  ngOnInit() {
    this.checkoutAddressUrl = `/${cartConfig.PATH_NAME.CHECKOUT_ADDRESS}`;
    this.subscription = this.orderService.order$.subscribe( order => {
      if (!_.isEmpty(order) && !order.error ) {
        this.shippingAddress = order.shipAddress;
        this.orderState = order.state;

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
