import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import * as _ from 'lodash';
import {
  OrderService
} from 'app/order/services/order.service';
import {
  LineItem
} from 'app/order/models/line-item.model';
import {
  Order
} from 'app/order/models/order.model';


@Component({
  selector: 'shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
  order: Order;
  lineItems: Array<LineItem>;
  subscription: Subscription;
  constructor(
    private orderService: OrderService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.orderService.order$.subscribe( res => {

      if (!_.isEmpty(res)) {
        const order = res.json();
        console.log('adafd log', order);
        this.lineItems = [...order.line_items];
        this.cd.markForCheck();
      }
    });

    this.subscription = this.orderService.getCurrentOrder()
      .subscribe( res => {
          if (!_.isEmpty(res)) {
            const order = res.json();
            this.order = order;
            this.lineItems = order.line_items;
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
      .subscribe( res => {
        console.log('res in shopping cart ', res.json());
      });
  }

  /**
   * Remove or +/- quantity of line item
   * @param variantId
   * @param quantity
   */
  removeFromCart(variantId: number, lineItemId?: number) {

    this.orderService
      .removeFromCart(variantId, lineItemId)
      .subscribe( res => {
        const lineItem = res.json();

        // if remove a line item object - default just +/- quantity
        if (!_.isUndefined(lineItemId)) {
          // find index of line item response in array line items
          const index = this.lineItems.findIndex( li => li.id === lineItemId );
          if (index > -1 ) {
            this.lineItems.splice(index, 1);
            this.cd.markForCheck();
          }
        }
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
