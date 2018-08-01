import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'lto-form-step',
  template: '<ng-content></ng-content>',
  exportAs: 'ltoFormStep'
})
export class FormStepComponent implements OnInit {
  @Input() form!: FormGroup;
  @Input() name!: string;
  control: FormGroup = new FormGroup({});

  constructor() {}

  ngOnInit() {
    if (!this.name) {
      throw '[name] required!';
    }

    this.form.addControl(this.name, this.control);
  }

  ngOnDestroy() {
    this.form.removeControl(this.name);
  }
}
