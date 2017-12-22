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
  CartService
} from 'app/shared/services/cart.service';
import {
  OrderConfigService
} from './order-config.service';

import {
  LineItem
} from '../models/line-item.model';
import {
  Order
} from 'app/order/models/order.model';

import { environment } from 'env/environment';

@Injectable()
export class OrderService {
  orderNumber: String;
  order$: Subject<any> = new BehaviorSubject<any>([]);

  constructor(
    private cartService: CartService,
    private httpService: HttpService,
    private localStorageService: LocalStorageService,
    private orderConfig: OrderConfigService
  ) {
    this.order$.subscribe(res => {
      if (!_.isEmpty(res)) {
        const order = res.json();
        this.orderNumber = order.number;
      }
    });
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
          this.cartService.cart$.next(res);
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
      return new Observable(obs => obs.next({}));
    }

    return this.httpService.get(
      `orders/${orderOnStorage.number}?order_token=${orderOnStorage.token}`
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

  /**
   * Delete line item from order
   * @param lineItemId
   * @param orderNumber
   * @return Observable
   */
  deleteLineItem(lineItemId: number, orderNumber: String): Observable<any> {

    return this.httpService.delete(
      `orders/${orderNumber}/line_items/${lineItemId}`
    );
  }

  /**
   * Change order status as address to delivery
   * @param params
   * @return Observable
   */
  changeOrderState(): Observable<any> {
    const headers = this.httpService.defaultHeaders();
    const orderToken = this.localStorageService.getOrder().token;
    headers.delete('Content-Type');

    return Observable.create(obs => {
      this.httpService.put(
        `checkouts/${this.orderNumber}/next.json?order_token=${orderToken}`,
        {},
        headers
      ).subscribe(res => {
        this.order$.next(res);
        obs.next(res);
      });
    });
  }

  updateOrder(params: any): Observable<any> {
    return Observable.create(obs => {
      this.httpService.put(
        `checkouts/${this.orderNumber}.json?order_token=${this.getOrderToken()}`,
        params
      ).subscribe(res => {
        this.order$.next(res);
        obs.next(res);
      });
    });
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
   * Get all payment method
   */
  availablePaymentMethods() {
    return this.httpService.get(
        `orders/${this.orderNumber}/payments/new?order_token=${this.getOrderToken()}`
      ).map(res => {
        const payments = res.json();
        return payments;
      });
  }

  /**
   * Create new payment of order
   * @param paymentModeId
   * @param paymentAmout
   */
  createNewPayment(paymentModeId: number, paymentAmout: number): Observable<any> {
    const headers = this.httpService.defaultHeaders();
    headers.delete('Content-Type');

    return this.httpService.post(
      `orders/${this.orderNumber}/payments?order_token=${this.getOrderToken()}`,
      {
        payment: {
          payment_method_id: paymentModeId,
          amount: paymentAmout
        }
      },
      headers
    ).map(res => {
      this.changeOrderState()
        .subscribe();
    });
  }

  getAndSetObservableOrder() {
    return this.getCurrentOrder()
      .do(res => {
        this.order$.next(res);
        this.cartService.cart$.next(res);
      });
  }

  /**
   * Get order by email
   * @param email
   */
  getOrders(email?: string): Observable<any>  {
    const headers = this.httpService.defaultHeaders();

    headers.set('X-Spree-Token', environment.API_KEY);

    return this.httpService.get(
        `orders?q[email_cont]=${email}`,
        null, headers
      ).map( res => res.json() );
  }

  /**
   * Get order by numbr
   * @param number
   */
  getOrder(number: string, token: string) {
    return this.httpService.get(
        `orders/${number}?order_token=${token}`
      );
  }

  /**
   * Get order token on local stogare
   */
  private getOrderToken(): String {
    const orderOnStorage = this.localStorageService.getOrder();

    return orderOnStorage.token;
  }

  /**
   * Create empty order
   */
  private createEmptyOrder() {
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
