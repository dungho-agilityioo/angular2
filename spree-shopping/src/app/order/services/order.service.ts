import { Observable } from 'rxjs/Observable';
import { async } from '@angular/core/testing';
import { LocalStorageService } from 'app/core/services/local-storage.service';
import { HttpService } from 'app/core/services/http.service';
import { Injectable } from '@angular/core';
import { LineItem } from '../models/line-item.model';
import 'rxjs/add/operator/take';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/switchMap';

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
  addToCart(variantId): Observable<any> {

    return Observable.create(obs => {
      this.getOrCreateOrderNumber()
        .switchMap((order) => {
          if (typeof order !== 'object') {
            order = order.json();
          }
          return this.createNewLineItem(variantId, order.number, order.token);
        })
        .subscribe( res => obs.next(res) );
    });
  }

  /**
   * Create line itme for order
   * @param variantId
   * @param orderNumber
   * @param orderToken
   * @return Observable
   */
  createNewLineItem(variantId: number, orderNumber: string, orderToken: string): Observable<any> {

    // send request to create new line item
    return this.httpService.post(
      `orders/${orderNumber}/line_items?order_token=${orderToken}`,
      {
        line_item: {
          variant_id: variantId,
          quantity: 1
        }
      }
    );
  }

  /**
   * Get Order Number or Create it
   * @return Observable
   */
  getOrCreateOrderNumber(): Observable<any> {
    let orderNumber = '';
    orderNumber = this.localStorageService.getOrderNumber();
console.log('orderNumber ', orderNumber);
    if (orderNumber) {
      return new Observable(obs => {
        const order = {
          number: orderNumber,
          token: this.localStorageService.getOrderToken()
        };
        obs.next(order);
      });
    }

    return this.createEmptyOrder();

  }

  /**
   * Create empty order
   */
  createEmptyOrder(): Observable<any> {
    const headers = this.httpService.defaultHeaders();
    headers.set('Content-Type', 'text/plain');

    return Observable.create(obs => {
      this.httpService.post(
          'orders.json', {}, headers
        )
        .subscribe(res => {
          const order = res.json();
          this.localStorageService.setOrderNumber(order.number);
          this.localStorageService.setOrderToken(order.token);
          obs.next(res);
        });
    });
  }

}
