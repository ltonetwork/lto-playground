import { OnInit, OnDestroy } from '@angular/core';
import {
  FormGroup,
  FormControl,
  ValidatorFn,
  AsyncValidatorFn,
  AbstractControl,
  Validators
} from '@angular/forms';
import { interpolate } from './utils';

export abstract class BaseInput implements OnInit, OnDestroy {
  abstract name: string;
  abstract formGroup: FormGroup;
  abstract control: FormControl;
  abstract definition: any;
  abstract value: any;

  // Our fields decide are they valid or not
  // We have 'validation' string in FieldDefinition
  // To check is field valid we need whole form data
  // because validation goes against whole form
  abstract formValue: any;

  ngOnInit() {
    if (!this.definition) {
      throw '[definition] requred!';
    }
    if (!this.name) {
      throw '[name] required!';
    }
    if (!this.formGroup) {
      throw '[formGroup] required!';
    }

    const validators: ValidatorFn[] = [];
    const asyncValidators: AsyncValidatorFn[] = [];

    this.control = new FormControl(this.value);
    if (this.definition.validation) {
      asyncValidators.push((control: AbstractControl) => {
        return new Promise<any>(resolve => {
          setTimeout(() => {
            const isValid = interpolate(this.definition.validation, this.formValue || {});
            if (!isValid) {
              resolve({
                customValidation: true
              });
            } else {
              resolve(null);
            }
          });
        });
      });
    }

    if (this.definition.required) {
      validators.push(Validators.required);
    }

    this.control.setValidators(validators);
    this.control.setAsyncValidators(asyncValidators);

    this.formGroup.addControl(this.name, this.control);
  }

  ngOnDestroy() {
    this.formGroup.removeControl(this.name);
  }
}
