import { Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { BaseInput } from '../../base-input';

@Component({
  selector: 'lto-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent extends BaseInput {
  @Input() formGroup!: FormGroup;
  @Input() definition!: any;
  @Input() name!: string;
  @Input() value!: any;
  @Input() formValue!: any;

  control!: FormControl;
}
