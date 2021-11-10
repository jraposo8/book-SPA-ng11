import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  transform(value: string, limit = 80): unknown {
    const max = value.substr(0,limit).lastIndexOf('');
    return value.length > max ? value.substr(0, limit) + '...' : value;
  }

}
