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

  control!: FormControl;
}
