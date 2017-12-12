import { Product } from './../models/product.model';
import { Observable } from 'rxjs/Observable';
import { HttpService } from './../../core/services/http.service';
import { Injectable } from '@angular/core';

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
  getProducts(): Observable<any> {
    return this.httpService.get('products')
      .map(products => products.json());
  }
}
