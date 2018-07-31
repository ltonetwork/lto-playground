import { Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { BaseInput } from '../../base-input';

@Component({
  selector: 'lto-amount',
  templateUrl: './amount.component.html',
  styleUrls: ['./amount.component.css']
})
export class AmountComponent extends BaseInput {
  @Input() formGroup!: FormGroup;
  @Input() definition!: any;
  @Input() name!: string;
  @Input() value!: any;
  @Input() formValue!: any;

  control!: FormControl;
}
