import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { document } from '../../../models/mongo/documents';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DocumentsService } from '../../../services/http/mongo/documents/documents.service';
import { UsersService } from '../../../services/http/mongo/users/users.service';
import { user } from '../../../models/mongo/users';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-documentos-form',
  templateUrl: './documentos-form.component.html',
  styleUrls: ['./documentos-form.component.css']
})
export class DocumentosFormComponent implements OnInit {
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' }
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/image',
    //upload: (file: File) => { ... }
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ]
  };
  local_data: document;
  users!: Array<user>;
  form!: FormGroup;

  constructor(private documentsService: DocumentsService,
    private usersService: UsersService,
    private builder: FormBuilder,
    public dialogRef: MatDialogRef<DocumentosFormComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: document) {
    this.local_data = { ...data };
    this.users = new Array<user>();
  }

  ngOnInit(): void {
    this.getAllUsers();
    this.form = this.builder.group({}, {
      updateOn: 'change',
    });
    this.form.addControl("id", new FormControl((this.local_data ? this.local_data.id : ''), Validators.required));

    this.form.addControl("htmlContent", new FormControl((this.local_data ? this.local_data.id : ''), Validators.required));


    this.form.addControl("doctype", new FormControl((this.local_data ? this.local_data.type : ''), Validators.required));
    this.form.addControl("name", new FormControl((this.local_data ? this.local_data.name : ''), Validators.required));
    this.form.addControl("content", new FormControl((this.local_data ? this.local_data.content : ''), Validators.required));
    this.form.addControl("author", new FormControl((this.local_data ? this.local_data.author : ''), Validators.required));
  }

  getAllUsers() {
    this.usersService.getAll().subscribe((result: Array<user>) => {
      if (result) {
        this.users = result;
      }
    }, err => {
      console.log(err)
    });
  }


  onFormSubmit() {
    if (!this.data) {
      this.documentsService.post({
        type: this.form.value.doctype,
        name: this.form.value.name,
        content: this.form.value.content,
        author: this.form.value.author,
        date: new Date()
      }).subscribe((result: document) => {
        if (result) {
          this.dialogRef.close(result);
        }
      }, err => {
        console.log(err)
      });
    }
    else {
      this.documentsService.put({
        id: this.data.id,
        type: this.form.value.doctype,
        name: this.form.value.name,
        content: this.form.value.content,
        author: this.form.value.author,
        date: new Date()
      }).subscribe((result: document) => {
        if (result) {
          this.dialogRef.close(result);
        }
      }, err => {
        console.log(err)
      });
    }
    
  }
  docTypeChange(event: any) {
    if (event.value != "") {

    }
  }
  userChange(event: any) {
    if (event.value != "") {

    }
  }
}
