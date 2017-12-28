import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

import * as _ from 'lodash';

import { OrderService } from 'app/order/services/order.service';
import { LineItem } from 'app/order/models/line-item.model';
import { Order } from 'app/order/models/order.model';
import * as cartConfig from 'app/cart/cart-config';

@Component({
  selector: 'shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
  order: Order;
  lineItems: Array<LineItem>;
  totalOrder: number;
  subscription: Subscription;
  orderState: String;
  constructor(
    private orderService: OrderService,
    private cd: ChangeDetectorRef,
    private router: Router
  ) { }

  ngOnInit() {
    this.subscription = this.orderService.order$
      .subscribe( order => {
        if (!_.isEmpty(order)) {
          this.lineItems = [...order.lineItems];
          this.totalOrder = order.total;
          this.orderState = order.state;
          this.cd.markForCheck();
        }
      });
  }

  onBtnCart(item): void {
    if (item.quantity < 0) {
      this.removeFromCart(item.variantId);
    } else {
      this.addToCart(item.variantId);
    }
  }

  addToCart(variantId: number): void {
    this.orderService
      .addToCart(variantId)
      .subscribe();
  }

  /**
   * Remove or +/- quantity of line item
   * @param variantId
   * @param quantity
   */
  removeFromCart(variantId: number, lineItemId?: number) {

    this.orderService
      .removeFromCart(variantId, lineItemId)
      .subscribe( lineItem => {
          if (!_.isUndefined(lineItemId) && !lineItem.error ) {
            // find index of line item response in array line items
            const index = this.lineItems.findIndex( li => li.id === lineItemId );
            if (index > -1 ) {
              this.lineItems.splice(index, 1);
              this.cd.markForCheck();
            }
          }
      });
  }

  /**
   * Change order state to delivery
   */
  placeOrder() {
    if ( this.orderState === 'cart' ) {
      this.orderService.changeOrderState()
        .do( () => {
          this.router.navigate([cartConfig.PATH_NAME.CHECKOUT_ADDRESS]);
        })
        .subscribe();
    } else {
      this.router.navigate([cartConfig.PATH_NAME.CHECKOUT_ADDRESS]);
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
