import { HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { User } from 'oidc-client';
import { document } from '../../../models/mongo/documents';
import { user } from '../../../models/mongo/users';
import { reduxLoginModel } from '../../../models/redux/login';
import { DocumentsService } from '../../../services/http/mongo/documents/documents.service';
import { UsersService } from '../../../services/http/mongo/users/users.service';
import { LoginSelectors } from '../../../store/login';
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
  loginredux!: reduxLoginModel;

  constructor(private documentsService: DocumentsService,
    private usersService: UsersService,
    private store: Store,
    public dialog: MatDialog) {
    this.documents = new Array<document>();
  }

  ngOnInit(): void {
    this.store.select(LoginSelectors.token).subscribe(result => {
      this.loginredux = result[0] as reduxLoginModel;
    }, err => {
      console.log(err.error);
    });
  }
  ngAfterViewInit() {
    this.getAllDocuments();
  }
  getAllDocuments() {
    this.documentsService.getAll().subscribe((result: Array<document>) => {
      if (result) {
        if (this.loginredux.isAdmin) {
          this.documents = result;
        }
        else {
          this.documents = result.filter(x => x.transcriptor == this.loginredux.userId);
        }

        this.documents.forEach((value, key) => {
          if (value.transcriptor != null) {
            this.usersService.get(value.transcriptor!).subscribe((result: user) => {
              if (result) {
                value.transcriptorName = result.name;
              }
            });
          }
        });

        this.dataSource = [...this.documents];
        this.loaded = true;
      }
    }, err => {
      console.log(err)
    });
  }
  displayedColumns: string[] = [
    'type',
    'transcriptorName',
    'name',
    'grupo',
    'corpus',
    'lugar',
    'soporte',
    'estado',
    'creationDate',
    'editaction',
    'deleteaction'
  ];

  @ViewChild(MatTable)
  table!: MatTable<document>;

  uploadDocument() {
    this.dialog.open(DocumentosFormComponent, {
      data: null,
      autoFocus: false,
      maxHeight: '90vh'
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
      data: event,
      autoFocus: false,
      maxHeight: '90vh'
    }).afterClosed().subscribe(res => {
      if (res) {
        let v = res.user;
        this.getAllDocuments();
      }
    });
  }  
}
