import { Pipe, PipeTransform } from '@angular/core';
import { DELIMETER } from '../delimeter';

@Pipe({
  name: 'fieldName'
})
export class FieldNamePipe implements PipeTransform {
  transform(name: string): any {
    if (name === 'function') {
      return name + DELIMETER;
    }
    return name;
  }
}
