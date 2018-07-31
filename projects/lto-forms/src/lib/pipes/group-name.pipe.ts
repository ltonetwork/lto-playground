import { Pipe, PipeTransform } from '@angular/core';
import { DELIMETER } from '../delimeter';

@Pipe({
  name: 'groupName'
})
export class GroupNamePipe implements PipeTransform {
  transform(name: string, index: number): string {
    return (name || 'nogroup') + DELIMETER + index;
  }
}
