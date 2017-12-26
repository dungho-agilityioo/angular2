import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import * as _ from 'lodash';

import { environment } from 'env/environment';
import { Product } from 'app/product/models/product.model';
import { HttpService } from 'app/core/services/http.service';
import { LineItem } from 'app/order/models/line-item.model';

@Injectable()
export class ProductService {

  constructor(
    private httpService: HttpService
  ) { }

  /**
   * Get product by slug
   * @param slug
   * @return Object<Product>
   */
  getProduct(slug: string): Observable<Product> {
    return this.httpService.get(`products/${slug}`)
      .map(product => product.json());
  }

  /**
   * Get list product
   * @return Object<Product[]>
   */
  getProducts(page?: number): Observable<any> {
    const params = { per_page: environment.perPage, page: page || 1 };

    return Observable.create(obs => {
      this.httpService.get('products', params)
        .subscribe(res => {
          obs.next(res);
        });
    });
  }

  /**
   * Get product quantity in current order
   * @param product
   * @param lineItems
   * @return number
   */
  getQuantity(product: Product, lineItems: any): number {
    // tslint:disable-next-line:curly
    if (_.isUndefined(lineItems) || _.isUndefined(product)) return 0;

    const variantId = product.master.id;
    const item = lineItems.find(
      li => li.variant_id === variantId
    );
    return _.isUndefined(item) ? 0 : item.quantity;
  }
}
