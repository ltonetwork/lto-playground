import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BaseInput } from '../../base-input';

@Component({
  selector: 'lto-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent extends BaseInput {
  @Input() formGroup!: FormGroup;
  @Input() definition!: any;
  @Input() name!: string;
  @Input() value!: any;
  @Input() formValue!: any;

  control!: FormControl;

  toggleCheckbox(item: any, event: { checked: boolean }) {
    const value: any[] = this.control.value || [];
    if (event.checked) {
      this.control.setValue([...value, item]);
    } else {
      const itemIndex = value.indexOf(item);
      this.control.setValue([...value.slice(0, itemIndex), ...value.slice(itemIndex + 1)]);
    }
  }
}
