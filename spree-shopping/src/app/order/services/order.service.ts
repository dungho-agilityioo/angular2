
import { Subject } from 'rxjs/Subject';
import {
  Injectable
} from '@angular/core';
import {
  BehaviorSubject
} from 'rxjs/BehaviorSubject';
import {
  Observable
} from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/share';

import * as _ from 'lodash';

import {
  LocalStorageService
} from 'app/core/services/local-storage.service';
import {
  HttpService
} from 'app/core/services/http.service';
import {
  LineItem
} from '../models/line-item.model';
import {
  Order
} from 'app/order/models/order.model';

@Injectable()
export class OrderService {
  order$: Subject<any> = new BehaviorSubject<any>([]);

  constructor(
    private httpService: HttpService,
    private localStorageService: LocalStorageService
  ) {
    this.order$.share();
  }

  /**
   * Add product to cart
   * @param variantId
   * @return Observable
   */
  addToCart(variantId: number): Observable<any> {
    return this.addOrRemoveItem(variantId, 1);
  }

  /**
   * Remove product from cart
   * @param variantId
   * @return Observable
   */
  removeFromCart(variantId: number, lineItemId?: number) {
      return this.addOrRemoveItem(variantId, -1, lineItemId);
  }

  /**
   * add or remove product in cart
   * @param variantId
   * @param quantity
   * @return Observable<any>
   */
  addOrRemoveItem(variantId: number, quantity: number, lineItemId?: number): Observable<any> {
    let lineItem: LineItem;
    return Observable.create(obs => {
      this.getOrCreateOrderNumber()
        .switchMap((order) => {
          if (typeof order !== 'object') {
            order = order.json();
          }
          if (_.isUndefined(lineItemId)) {
            return this.updateLineItem(variantId, order.number, order.token, quantity);
          } else {
            return this.deleteLineItem(lineItemId, order.number);
          }
        })
        .switchMap((res) => {
          lineItem = res;
          return this.getCurrentOrder();
        })
        .subscribe(res => {
          this.order$.next(res);
          obs.next(lineItem);
        });
    });
  }

  /**
   * Get current order
   * @return Observable<Order>
   */
  getCurrentOrder(): Observable<any> {
    const orderOnStorage = this.localStorageService.getOrder();

    if (_.isNull(orderOnStorage)) {
      return new Observable(obs => obs.next({}) );
    }

    return this.httpService.get(
        `orders/${orderOnStorage.number}?order_token=${orderOnStorage.number}`
      );
  }

  /**
   * Create or remove line itme for order
   * @param variantId
   * @param orderNumber
   * @param orderToken
   * @return Observable
   */
  updateLineItem(variantId: number, orderNumber: string, orderToken: string, quantity: number): Observable<any> {

    // send request to create new line item
    return this.httpService.post(
      `orders/${orderNumber}/line_items?order_token=${orderToken}`,
      {
        line_item: {
          variant_id: variantId,
          quantity: quantity
        }
      }
    );
  }

  deleteLineItem(lineItemId: number, orderNumber: String): Observable<any> {

    return this.httpService.delete(
        `orders/${orderNumber}/line_items/${lineItemId}`
      );
  }

  /**
   * Get Order Number or Create it
   * @return Observable
   */
  getOrCreateOrderNumber(): Observable<any> {
    const orderOnStorage = this.localStorageService.getOrder();

    if (orderOnStorage && orderOnStorage.number) {
      return new Observable(obs => {
        const order = {
          number: orderOnStorage.number,
          token: orderOnStorage.token
        };
        obs.next(order);
      });
    }

    return this.createEmptyOrder();

  }

  /**
   * Create empty order
   */
  createEmptyOrder() {
    const headers = this.httpService.defaultHeaders();
    headers.set('Content-Type', 'text/plain');

    return Observable.create(obs => {
      this.httpService.post(
        'orders.json', {}, headers
      )
        .map(res => {
          const order = res.json();
          this.localStorageService.setOrder({
            number: order.number,
            token: order.token
          });
          return order;
        }).subscribe(res => {
          return obs.next(res);
        });
    });
  }

}
