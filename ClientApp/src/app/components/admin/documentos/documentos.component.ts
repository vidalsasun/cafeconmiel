import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { document } from '../../../models/mongo/documents';
import { DocumentsService } from '../../../services/http/mongo/documents/documents.service';
import { DocumentosFormComponent } from '../documentos-form/documentos-form.component';

@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.component.html',
  styleUrls: ['./documentos.component.css']
})
export class DocumentosComponent implements OnInit {

  documents!: Array<document>;
  dataSource!: Array<document>;
  loaded: boolean = false;

  constructor(private documentsService: DocumentsService,
    public dialog: MatDialog) {
    this.documents = new Array<document>();
  }

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    this.getAllDocuments();
  }
  getAllDocuments() {
    this.documentsService.getAll().subscribe((result: Array<document>) => {
      if (result) {
        this.documents = result;
        this.dataSource = [...this.documents];
        this.loaded = true;
      }
    }, err => {
      console.log(err)
    });
  }
  displayedColumns: string[] = [
    'id',
    'name',
    'date',
    'content',
    'author',
    'editaction',
    'deleteaction'
  ];

  @ViewChild(MatTable)
  table!: MatTable<document>;

  uploadDocument() {
    this.dialog.open(DocumentosFormComponent, {
      data: null
    }).afterClosed().subscribe(res => {
      this.getAllDocuments();
    });
  }
  deleteDocument(event: any) {
    this.documentsService.delete(event.id).subscribe((result: document) => {
      this.getAllDocuments();
    }, err => {
      console.log(err)
    });
  }
  editDocument(event: any) {   
    this.dialog.open(DocumentosFormComponent,{      
      data: event
    }).afterClosed().subscribe(res => {
      if (res) {
        let v = res.user;
        this.getAllDocuments();
      }
    });
  }
}
