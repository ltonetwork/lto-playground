import { Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { BaseInput } from '../../base-input';

@Component({
  selector: 'lto-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})
export class DatepickerComponent extends BaseInput {
  @Input() formGroup!: FormGroup;
  @Input() definition!: any;
  @Input() name!: string;
  @Input() value!: any;
  @Input() formValue!: any;

  control!: FormControl;

  get min(): Date | null {
    return this.definition.min || null;
  }

  get max(): Date | null {
    return this.definition.max || null;
  }
}
