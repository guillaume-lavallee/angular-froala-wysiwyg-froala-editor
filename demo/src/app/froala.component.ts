import { Component, Input, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'froala-component',
  template: `
  <form [formGroup]="campaignForm" (ngSubmit)="onSubmit()">
  <div class="form-group">
    <div
      id="froala-editor"
      [froalaEditor]="options"
      [(froalaModel)]="content"
      formControlName="editor"
    ></div>
  </div>

  <button type="submit" class="btn btn-primary">Submit</button>
</form>

  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FroalaComponent),
      multi: true,
    },
  ],
})
export class FroalaComponent implements ControlValueAccessor {
  constructor() {}

  // Begin ControlValueAccesor methods.
  onChange = (_) => {};
  onTouched = () => {};

  // Form model content changed.
  writeValue(content: any): void {
    this.model = content;
  }

  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  // End ControlValueAccesor methods.

  model: any;

  config: Object = {
    charCounterCount: false,
  };
}
