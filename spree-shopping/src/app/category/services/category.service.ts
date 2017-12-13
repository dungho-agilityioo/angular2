import { Observable } from 'rxjs/Observable';
import { HttpService } from 'app/core/services/http.service';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class CategoryService {

  constructor(
    private httpService: HttpService
  ) { }

  /**
   * Get list category
   * @return @
   */
  getCategories(): Observable<any> {
    return this.httpService.get(
        'taxonomies/1/taxons'
      )
      .map( res => res.json().taxons);
  }
}
