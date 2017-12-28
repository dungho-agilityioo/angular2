import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import * as _ from 'lodash';

import { environment } from 'env/environment';
import { Product } from 'app/product/models/product.model';
import { HttpService } from 'app/core/services/http.service';
import { LineItem } from 'app/order/models/line-item.model';
import * as productConfig from 'app/product/product-config';

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
    const compiled = _.template(productConfig.API_PATH_NAME.PRODUCT_ONE_URL);
    const productUrl = compiled({ slug: slug });

    return this.httpService.get(productUrl);
  }

  /**
   * Get list product
   * @return Object<Product[]>
   */
  getProducts(page?: number, taxonId?: number): Observable<any> {
    const params = { per_page: environment.perPage, page: page || 1 };
    let productUrl = productConfig.API_PATH_NAME.PRODUCT_URL;

    if ( !_.isUndefined(taxonId) && taxonId > 0 ) {
      productUrl =  productConfig.API_PATH_NAME.PRODUCT_TAXON_URL;
      params['id'] = taxonId;
    }

    return Observable.create(obs => {
      this.httpService.get(
        productUrl,
          params
        )
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
      li => li.variantId === variantId
    );

    return _.isUndefined(item) ? 0 : item.quantity;
  }
}
