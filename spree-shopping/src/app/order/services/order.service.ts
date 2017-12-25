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

import { LocalStorageService } from 'app/core/services/local-storage.service';
import { HttpService } from 'app/core/services/http.service';
import { CartService } from 'app/shared/services/cart.service';
import * as orderConfig from 'app/order/order-config';

import { LineItem } from 'app/order/models/line-item.model';
import { Order } from 'app/order/models/order.model';
import { environment } from 'env/environment';

@Injectable()
export class OrderService {
  orderNumber: String;
  order$: Subject<any> = new BehaviorSubject<any>([]);

  constructor(
    private cartService: CartService,
    private httpService: HttpService,
    private localStorageService: LocalStorageService
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
            return this.updateLineItem(variantId, quantity);
          } else {
            return this.deleteLineItem(lineItemId);
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

    const orderCurrentUrl = this.buildUrlByParam(
      orderConfig.API_PATH_NAME.ORDER_CURRENT
    );

    return this.httpService.get(orderCurrentUrl);
  }

  /**
   * Create or remove line itme for order
   * @param variantId
   * @return Observable
   */
  updateLineItem(variantId: number, quantity: number): Observable<any> {
    const orderLineItemUrl = this.buildUrlByParam(
        orderConfig.API_PATH_NAME.ORDER_LINE_ITEM
      );

    // send request to create new line item
    return this.httpService.post(
      orderLineItemUrl,
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
  deleteLineItem(lineItemId: number): Observable<any> {
    const complied = _.template(orderConfig.API_PATH_NAME.ORDER_LINE_ITEM_ONE);
    const orderLineItemUrl = complied({
      number: this.getOrderNumber(),
      id: lineItemId
    });

    return this.httpService.delete(orderLineItemUrl);
  }

  /**
   * Change order status as address to delivery
   * @param params
   * @return Observable
   */
  changeOrderState(): Observable<any> {
    const headers = this.httpService.defaultHeaders();
    const orderChangeStateUrl = this.buildUrlByParam(
        orderConfig.API_PATH_NAME.ORDER_CHANGE_STATE
      );

    headers.delete('Content-Type');

    return Observable.create(obs => {
      this.httpService.put(
        orderChangeStateUrl,
        {},
        headers
      ).subscribe(res => {
        this.order$.next(res);
        obs.next(res);
      });
    });
  }

  updateOrder(params: any): Observable<any> {
    const orderUrl = this.buildUrlByParam(
        orderConfig.API_PATH_NAME.ORDER_UPDATE
      );

    return Observable.create(obs => {
      this.httpService.put(
        orderUrl,
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
    const paymentMethodUrl = this.buildUrlByParam(
        orderConfig.API_PATH_NAME.ORDER_PAYMENT_METHOD
      );

    return this.httpService.get(
        paymentMethodUrl
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
    const paymentUrl = this.buildUrlByParam(
        orderConfig.API_PATH_NAME.ORDER_PAYMENT
      );

    headers.delete('Content-Type');

    return this.httpService.post(
      paymentUrl,
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
    const complied = _.template(orderConfig.API_PATH_NAME.ORDER_SEARCH);
    const orderSearchUrl = complied({ email: email });

    // set role to admin
    headers.set('X-Spree-Token', environment.API_KEY);

    return this.httpService.get(
        orderSearchUrl,
        null, headers
      ).map( res => res.json() );
  }

  /**
   * Get order by numbr
   * @param number
   */
  getOrder(number: string, token: string) {
    const orderUrl = this.buildUrlByParam(
        orderConfig.API_PATH_NAME.ORDER_ONE,
        number,
        token
      );

    return this.httpService.get(orderUrl);
  }

  /**
   * Get order token on local stogare
   */
  private getOrderToken(): string {
    const orderOnStorage = this.localStorageService.getOrder();

    return orderOnStorage.token;
  }

  /**
   * Get order number on local stogare
   */
  private getOrderNumber(): string {
    const orderOnStorage = this.localStorageService.getOrder();

    return orderOnStorage.number;
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

  /**
   * Build url use lodash template
   * @param paramUrl
   */
  private buildUrlByParam(paramUrl: string, orderNumber?: string, orderToken?: string) {
    const compiled = _.template(paramUrl);
    const  url = compiled({
      number: (_.isUndefined(orderNumber)) ? this.getOrderNumber() : orderNumber,
      token: (_.isUndefined(orderToken)) ? this.getOrderToken() : orderToken
    });

    return url;
  }

}
