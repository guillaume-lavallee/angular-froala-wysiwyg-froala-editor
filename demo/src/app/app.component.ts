import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import FroalaEditor from 'froala-editor';

@Component({
  selector: 'app-demo',
  template: `
  <form [formGroup]="campaignForm" (ngSubmit)="onSubmit()">
  <div class="form-group">
    <div
      id="froala-editor"
      [froalaEditor]="options"
      [(froalaModel)]="content"
      formControlName="editor">
    </div>
  </div> 
  <button type="submit" class="btn btn-primary">Submit</button>
</form> 
  `,
})
export class AppComponent implements OnInit {
  campaignForm: FormGroup;
  public options = {
    htmlUntouched: false,
    toolbarButtons: [['non_breacking_space', 'html']],
  };

  constructor(private formBuilder: FormBuilder) {}
  ngOnInit() {
    FroalaEditor.DefineIcon('non_breacking_space', {
      NAME: 'insertContent',
      SVG_KEY: 'cogs',
    });
    FroalaEditor.RegisterCommand('non_breacking_space', {
      title: 'Insert non-breackign space',
      focus: true,
      undo: true,
      refreshAfterCallback: true,
      callback: function (cmd, val) {
        console.log(val);
        this.html.insert('&nbsp;');
      },
      // Callback on refresh.
      refresh: function ($btn) {
        console.log('do refresh');
      },
      // Callback on dropdown show.
      refreshOnShow: function ($btn, $dropdown) {
        console.log('do refresh when show');
      },
    });
    this.campaignForm = this.formBuilder.group({
      editor: [''],
    });
  }
  onSubmit() {
    console.log(this.campaignForm.value, 'values');
  }
}
