import {
  BehaviorSubject
} from 'rxjs/BehaviorSubject';
import {
  Subject
} from 'rxjs/Subject';
import {
  Injectable
} from '@angular/core';
import {
  Observable
} from 'rxjs/Observable';

import {
  environment
} from 'env/environment';
import {
  Product
} from './../models/product.model';
import {
  HttpService
} from 'app/core/services/http.service';

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
}
