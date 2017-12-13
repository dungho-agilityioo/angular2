import { environment } from 'env/environment';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formaturlimage'
})
export class FormatUrlImagePipe implements PipeTransform {

  transform(url: any): any {
    console.log('url', url);
    return environment.API_BASE_URL + url;
  }

}
