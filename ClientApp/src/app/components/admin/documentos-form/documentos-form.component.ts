import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { document } from '../../../models/mongo/documents';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DocumentsService } from '../../../services/http/mongo/documents/documents.service';

@Component({
  selector: 'app-documentos-form',
  templateUrl: './documentos-form.component.html',
  styleUrls: ['./documentos-form.component.css']
})
export class DocumentosFormComponent implements OnInit {

  local_data: document;

  form!: FormGroup;

  constructor(private documentsService: DocumentsService,
    private builder: FormBuilder,
    public dialogRef: MatDialogRef<DocumentosFormComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: document) {
    this.local_data = { ...data };
  }

  ngOnInit(): void {

    this.form = this.builder.group({}, {
      updateOn: 'change',
    });
    this.form.addControl("id", new FormControl((this.local_data ? this.local_data.id : ''), Validators.required));
    this.form.addControl("name", new FormControl((this.local_data ? this.local_data.name : ''), Validators.required));
    this.form.addControl("content", new FormControl((this.local_data ? this.local_data.content : ''), Validators.required));
    this.form.addControl("author", new FormControl((this.local_data ? this.local_data.author : ''), Validators.required));
  }
  onFormSubmit() {
      this.documentsService.post({       
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
