import { SlicePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe extends SlicePipe implements PipeTransform {

  transform(value: any, limit: number): any {
    const slice = super.transform(value, 0, limit);

    return slice + '...';
  }

}
