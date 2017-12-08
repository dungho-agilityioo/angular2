import { Observable } from 'rxjs/Observable';
import { HttpService } from './../../core/services/http.service';
import { Injectable } from '@angular/core';

@Injectable()
export class ProductService {

  constructor(
    private httpService: HttpService
  ) { }

  /**
   * Get product by id
   * @param id
   * @return Object<Product>
   */
  getProduct(id: string) {
    return this.httpService.get(`products/${id}`)
      .map(product => product.json());
  }
}
