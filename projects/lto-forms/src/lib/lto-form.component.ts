import { Component, OnInit, Input, Output, ViewChild, TemplateRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, of, merge } from 'rxjs';
import { map, shareReplay, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { clean, interpolate } from './utils';

@Component({
  selector: 'lto-form',
  templateUrl: './lto-form.component.html',
  styleUrls: ['./lto-form.component.scss']
})
export class LtoFormComponent implements OnInit {
  @Input() schema: any;
  @Input() initialValue: any = {}; // By default it is empty object.
  @Output() valueChange: Observable<any>;

  form: FormGroup = new FormGroup({});
  formData$: Observable<any>; // Clean form data

  conditions: { [condition: string]: Observable<boolean> } = {};

  @ViewChild('templateNotFoundTpl') templateNotFoundTpl!: TemplateRef<any>;
  @ViewChild('txtTpl') txtTpl!: TemplateRef<any>;
  @ViewChild('selectTpl') selectTpl!: TemplateRef<any>;
  @ViewChild('amoutnTpl') amoutnTpl!: TemplateRef<any>;
  @ViewChild('moneyTpl') moneyTpl!: TemplateRef<any>;
  @ViewChild('dateTpl') dateTpl!: TemplateRef<any>;
  @ViewChild('textareaTpl') textareaTpl!: TemplateRef<any>;
  @ViewChild('checkboxTpl') checkboxTpl!: TemplateRef<any>;
  @ViewChild('groupTpl') groupTpl!: TemplateRef<any>;
  @ViewChild('expressionTpl') expressionTpl!: TemplateRef<any>;

  constructor() {
    this.formData$ = this.form.valueChanges.pipe(
      map(val => clean(val)),
      map((val: any) => {
        return Object.keys(val).reduce((formValue: any, key) => {
          if (typeof val[key] === 'object' && val[key]) {
            // this is group and we have to clean up it
            const group = Object.keys(val[key]).reduce((groupValue, fieldName) => {
              if (val[key]) {
                return { ...groupValue, [fieldName]: val[key][fieldName] };
              } else {
                return groupValue;
              }
            }, {});

            // If group is empty -- do not include it
            return Object.keys(group).length ? { ...formValue, [key]: group } : formValue;
          } else {
            // This is simple field
            // If field is empty - do not include it into result
            return val[key] ? { ...formValue, [key]: val[key] } : formValue;
          }
        }, {});
      }),
      shareReplay(1)
    );

    // When our form initializes it puts inputs one by one
    // As a result we fire new 'change' event for each input
    // Put this event in the end of 'JS queue' to fire only one event
    // With all fields inside
    this.valueChange = this.formData$.pipe(debounceTime(0));
  }

  ngOnInit() {}

  getCondition$(condition: string, group: string = ''): Observable<boolean> {
    const key = condition + group;
    if (!this.conditions[key]) {
      if (!condition) {
        // Always visible if no conditions
        this.conditions[key] = of(true);
      } else {
        // We need .merge over here because we need to kickstart form creation
        // if we just subscribe on form value we will never get initial value
        // because it will be kind of cycle dependency: ngIf waits for value to change
        // but form value cannot change because we cannot add fields until ngIf resolves
        this.conditions[key] = merge(of(clean(this.form.value)), this.formData$).pipe(
          map(model => interpolate(condition, model, group)),
          distinctUntilChanged(), // Trigger change detection on ngIf only if value changed
          shareReplay(1)
        );
      }
    }
    return this.conditions[key];
  }

  getTemplate(fieldSchema: any): TemplateRef<any> {
    const $schema: string = fieldSchema.$schema;
    if (!$schema) {
      throw 'field schema should contain $schema property!';
    }
    const fieldType = $schema.split('#').pop();
    switch (fieldType) {
      case 'text':
      case 'email':
      case 'password':
      case 'number':
        return this.txtTpl;
      case 'select':
        return this.selectTpl;
      case 'amount':
        return this.amoutnTpl;
      case 'money':
        return this.moneyTpl;
      case 'date':
        return this.dateTpl;
      case 'textarea':
        return this.textareaTpl;
      case 'checkbox':
        return this.checkboxTpl;
      case 'group':
        return this.groupTpl;
      case 'expression':
        return this.expressionTpl;
      default:
        return this.templateNotFoundTpl;
    }
  }

  valueFor(stepGroup: string, fieldName: string): any {
    if (!stepGroup) {
      return this.initialValue[fieldName];
    }
    return (this.initialValue[stepGroup] || {})[fieldName];
  }
}
