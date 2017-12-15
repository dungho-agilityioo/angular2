import {
  Pipe,
  PipeTransform
} from '@angular/core';

import { environment } from 'env/environment';

@Pipe({
  name: 'formaturlimage'
})
export class FormatUrlImagePipe implements PipeTransform {

  transform(url: any): any {
    return environment.API_BASE_URL + url;
  }

}
