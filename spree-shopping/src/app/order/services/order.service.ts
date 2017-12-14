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

import {
  LocalStorageService
} from 'app/core/services/local-storage.service';
import {
  HttpService
} from 'app/core/services/http.service';
import {
  LineItem
} from '../models/line-item.model';

@Injectable()
export class OrderService {

  constructor(
    private httpService: HttpService,
    private localStorageService: LocalStorageService
  ) { }

  /**
   * Add product to cart
   * @param variantId
   * @return Observable
   */
  addToCart(product): Observable<any> {
    const variantId = product.master.id;

    return Observable.create(obs => {
      this.getOrCreateOrderNumber()
        .switchMap((order) => {
          if (typeof order !== 'object') {
            order = order.json();
          }
          return this.updateLineItem(variantId, order.number, order.token, 1);
        })
        .subscribe(res => obs.next(res));
    });
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
   * Get Order Number or Create it
   * @return Observable
   */
  getOrCreateOrderNumber(): Observable<any> {
    const orderOnStorage = this.localStorageService.getOrder();

    if (orderOnStorage && orderOnStorage.number ) {
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
