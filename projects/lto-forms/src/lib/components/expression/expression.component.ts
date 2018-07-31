import { Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { interpolate } from '../../utils';
import { BaseInput } from '../../base-input';

@Component({
  selector: 'lto-expression',
  template: ''
})
export class ExpressionComponent extends BaseInput {
  @Input() formGroup!: FormGroup;
  @Input() definition!: any;
  @Input() name!: string;
  @Input() value!: any;
  @Input() formValue!: any;

  control!: FormControl;

  ngOnInit() {
    super.ngOnInit();
    this.setValue();
  }

  ngOnChanges() {
    this.setValue();
  }

  private setValue() {
    if (this.control) {
      const newValue = interpolate(this.definition.expression, this.formValue || {});
      if (newValue !== this.control.value) {
        this.control.setValue(interpolate(this.definition.expression, this.formValue || {}));
      }
    }
  }
}
