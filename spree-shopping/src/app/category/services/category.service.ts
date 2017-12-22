import {
  Observable
} from 'rxjs/Observable';

import {
  Injectable
} from '@angular/core';
import 'rxjs/add/operator/switchMap';

import {
  HttpService
} from 'app/core/services/http.service';
import {
  CategoryConfigService
} from './category-config.service';

@Injectable()
export class CategoryService {

  constructor(
    private httpService: HttpService,
    private categoryConfig: CategoryConfigService
  ) { }

  /**
   * Get list category
   * @return @
   */
  getCategories(): Observable<any> {
    return this.httpService.get(
        this.categoryConfig.API_PATH_NAME.TAXONOMY
      )
      .map( res => res.json().taxons);
  }
}
