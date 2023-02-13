import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import FroalaEditor from 'froala-editor';
import 'froala-editor/js/languages/de.js';

import 'froala-editor/js/languages/da.js';

@Component({
  selector: 'app-demo',
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
})
export class AppComponent implements OnInit {
  campaignForm: FormGroup;
  public options = {
    toolbarButtons: ['my_dropdown'],

    /** Works Perfectly */
    /*toolbarButtons: [
      ['undo', 'redo', 'bold'],
       ['h1', 'h2', 'insert'],
       ['alignLeft', 'alignCenter', 'formatOLSimple', 'alignRight', 'alignJustify', 'formatOL', 'formatUL', 'paragraphFormat', 'paragraphStyle', 'lineHeight', 'outdent', 'indent', 'quote'],
       ['insertLink', 'insertImage', 'insertTable', 'emoticons', 'specialCharacters', 'fontAwesome', 'embedly', 'insertHR'],
       ['undo', 'redo', 'fullscreen', 'print', 'getPDF', 'spellChecker', 'selectAll', 'html'],
       ],*/
  };

  constructor(private formBuilder: FormBuilder) {}
  ngOnInit() {
    FroalaEditor.DefineIcon('my_dropdown', {
      NAME: 'cog',
      SVG_KEY: 'cogs',
    });
    FroalaEditor.RegisterCommand('my_dropdown', {
      title: 'Advanced options',
      type: 'dropdown',
      focus: false,
      undo: false,
      refreshAfterCallback: true,
      options: {
        v1: 'German',
        v2: 'Danish',
      },
      callback: function (cmd, val) {
        console.log(val);
        if (val == 'v1') {
          this.destroy();
          new FroalaEditor('div#froala-editor', {
            toolbarButtons: ['bold', 'italic', 'formatBlock', 'my_dropdown'],
            language: 'de',
          });
        }
        if (val == 'v2') {
          console.log('asdf');
          this.destroy();
          new FroalaEditor('div#froala-editor', {
            toolbarButtons: ['bold', 'my_dropdown'],
            language: 'da',
          });
        }
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
