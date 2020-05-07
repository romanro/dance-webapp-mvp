import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], field: string, value: string): any[] {
    console.log('value:', value)
    console.log(1111111)
    if (!items || !value) return [];
    return items.filter(it => it[field].search(value) != -1);
  }
  
}
