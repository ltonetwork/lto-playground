import { Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { BaseInput } from '../../base-input';

@Component({
  selector: 'lto-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss']
})
export class TextInputComponent extends BaseInput {
  @Input() formGroup!: FormGroup;
  @Input() definition!: any;
  @Input() name!: string;
  @Input() value!: any;
  @Input() formValue!: any;
  get type(): 'text' | 'email' | 'password' | 'number' {
    const schemaType = this.definition.$schema.split('#').pop();
    return schemaType;
  }

  get minValue(): number {
    return this.definition.min === void 0 ? Number.MIN_VALUE : this.definition.min;
  }

  get maxValue(): number {
    return this.definition.max === void 0 ? Number.MAX_VALUE : this.definition.max;
  }

  control!: FormControl;
}
