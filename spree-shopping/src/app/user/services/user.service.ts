import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { environment } from 'env/environment';
import { Order } from 'app/order/models/order.model';
import { HttpService } from 'app/core/services/http.service';


@Injectable()
export class UserService {

  constructor(
    private httpService: HttpService
  ) { }

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

}
