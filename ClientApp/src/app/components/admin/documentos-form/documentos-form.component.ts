import { Component, ElementRef, Inject, OnInit, Optional, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { document } from '../../../models/mongo/documents';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DocumentsService } from '../../../services/http/mongo/documents/documents.service';
import { UsersService } from '../../../services/http/mongo/users/users.service';
import { user } from '../../../models/mongo/users';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { DocumentosFormComponentVars } from './documentos-form.component-vars';
import { Store } from '@ngrx/store';
import { LoginSelectors } from '../../../store/login';
import { reduxLoginModel } from '../../../models/redux/login';

@Component({
  selector: 'app-documentos-form',
  templateUrl: './documentos-form.component.html',
  styleUrls: ['./documentos-form.component.css']
})
export class DocumentosFormComponent implements OnInit {

  @ViewChild('fileInput') fileInput!: ElementRef;
  fileAttr = 'Choose File';
  uploadFileEvt(imgFile: any) {
    if (imgFile.target.files && imgFile.target.files[0]) {
      this.fileAttr = '';
      Array.from(imgFile.target.files).forEach((file: any) => {
        this.fileAttr += file.name + ' - ';
      });
      // HTML5 FileReader API
      let reader = new FileReader();
      reader.onload = (e: any) => {
        let image = new Image();
        image.src = e.target.result;
        image.onload = (rs) => {
          let imgBase64Path = e.target.result;
        };
      };
      reader.readAsDataURL(imgFile.target.files[0]);
      // Reset if duplicate image uploaded again
      this.fileInput.nativeElement.value = '';
    } else {
      this.fileAttr = 'Choose File';
    }
  }

  editorConfig!: AngularEditorConfig;
  local_data: document;
  users!: Array<user>;
  form!: FormGroup;
  loginredux!: reduxLoginModel;
  defaultUser?: string;

  constructor(private documentsService: DocumentsService,
    private usersService: UsersService,
    private builder: FormBuilder,
    private localVars: DocumentosFormComponentVars,
    public dialogRef: MatDialogRef<DocumentosFormComponent>,
    private store: Store,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: document) {
    this.local_data = { ...data };
    this.users = new Array<user>();
    this.editorConfig =  this.localVars.editorConfig
  }

  ngOnInit(): void {

    this.store.select(LoginSelectors.token).subscribe(result => {
      this.loginredux = result[0] as reduxLoginModel;
    }, err => {
      console.log(err.error);
    });

    this.getAllUsers();
    this.form = this.builder.group({}, {
      updateOn: 'change',
    });
    this.form.addControl("id", new FormControl((this.local_data ? this.local_data.id : ''), Validators.required));
    this.form.addControl("type", new FormControl((this.local_data ? this.local_data.type : ''), Validators.required));
    this.form.addControl("name", new FormControl((this.local_data ? this.local_data.name : ''), Validators.required));
    this.form.addControl("grupo", new FormControl((this.local_data ? this.local_data.grupo : ''), Validators.required));
    this.form.addControl("corpus", new FormControl((this.local_data ? this.local_data.corpus : ''), Validators.required));
    this.form.addControl("archivo", new FormControl((this.local_data ? this.local_data.archivo : ''), Validators.required));
    this.form.addControl("signatura", new FormControl((this.local_data ? this.local_data.signatura : ''), Validators.required));
    this.form.addControl("folios", new FormControl((this.local_data ? this.local_data.folios : ''), Validators.required));
    this.form.addControl("anyo", new FormControl((this.local_data ? this.local_data.anyo : ''), Validators.required));
    this.form.addControl("mes", new FormControl((this.local_data ? this.local_data.mes : ''), Validators.required));
    this.form.addControl("dia", new FormControl((this.local_data ? this.local_data.dia : ''), Validators.required));
    this.form.addControl("lugar", new FormControl((this.local_data ? this.local_data.lugar : ''), Validators.required));
    this.form.addControl("provincia", new FormControl((this.local_data ? this.local_data.provincia : ''), Validators.required));
    this.form.addControl("pais", new FormControl((this.local_data ? this.local_data.pais : ''), Validators.required));
    this.form.addControl("regesto", new FormControl((this.local_data ? this.local_data.regesto : ''), Validators.required));
    this.form.addControl("tipoDocumental", new FormControl((this.local_data ? this.local_data.tipoDocumental : ''), Validators.required));
    this.form.addControl("copista", new FormControl((this.local_data ? this.local_data.copista : ''), Validators.required));
    this.form.addControl("firma", new FormControl((this.local_data ? this.local_data.firma : ''), Validators.required));
    this.form.addControl("soporte", new FormControl((this.local_data ? this.local_data.soporte : ''), Validators.required));
    this.form.addControl("estado", new FormControl((this.local_data ? this.local_data.estado : ''), Validators.required));
    this.form.addControl("transcriptor", new FormControl((this.local_data ? this.local_data.transcriptor : ''), Validators.required));
    this.form.addControl("primerRevisor", new FormControl((this.local_data ? this.local_data.primerRevisor : ''), Validators.required));
    this.form.addControl("segundoRevisor", new FormControl((this.local_data ? this.local_data.segundoRevisor : ''), Validators.required));
    this.form.addControl("filename", new FormControl((this.local_data ? this.local_data.segundoRevisor : ''), Validators.required));
    this.form.addControl("uploadFile", new FormControl((this.local_data ? this.local_data.segundoRevisor : ''), Validators.required));
    this.form.addControl("textopaleografico", new FormControl((this.local_data ? this.local_data.textopaleografico : ''), Validators.required));
    this.form.addControl("textocritico", new FormControl((this.local_data ? this.local_data.textocritico : ''), Validators.required));



  }

  getAllUsers() {
    this.usersService.getAll().subscribe((result: Array<user>) => {
      if (result) {
        this.users = result;

        if (!this.data) {
          this.defaultUser = this.users.filter(x => x.id == this.loginredux!.userId)!.shift()?.id;
        }
        else {
          this.defaultUser = this.local_data.transcriptor;
        }

        

      }
    }, err => {
      console.log(err)
    });
  }


  onFormSubmit() {
    if (!this.data) {
      this.documentsService.post({
        type: this.form.value.type,
        name: this.form.value.name,
        grupo: this.form.value.grupo,
        corpus: this.form.value.corpus,
        archivo: this.form.value.archivo,
        signatura: this.form.value.signatura,
        folios: this.form.value.folios,
        anyo: this.form.value.anyo,
        mes: this.form.value.mes,
        dia: this.form.value.dia,
        lugar: this.form.value.lugar,
        provincia: this.form.value.provincia,
        pais: this.form.value.pais,
        regesto: this.form.value.regesto,
        tipoDocumental: this.form.value.tipoDocumental,
        copista: this.form.value.copista,
        firma: this.form.value.firma,
        soporte: this.form.value.soporte,
        estado: this.form.value.estado,
        transcriptor: this.form.value.transcriptor,
        primerRevisor: this.form.value.primerRevisor,
        segundoRevisor: this.form.value.segundoRevisor,
        textopaleografico: this.form.value.textopaleografico,
        textocritico: this.form.value.textocritico,
        creationdate: new Date()
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
        type: this.form.value.type,
        name: this.form.value.name,
        grupo: this.form.value.grupo,
        corpus: this.form.value.corpus,
        archivo: this.form.value.archivo,
        signatura: this.form.value.signatura,
        folios: this.form.value.folios,
        anyo: this.form.value.anyo,
        mes: this.form.value.mes,
        dia: this.form.value.dia,
        lugar: this.form.value.lugar,
        provincia: this.form.value.provincia,
        pais: this.form.value.pais,
        regesto: this.form.value.regesto,
        tipoDocumental: this.form.value.tipoDocumental,
        copista: this.form.value.copista,
        firma: this.form.value.firma,
        soporte: this.form.value.soporte,
        estado: this.form.value.estado,
        transcriptor: this.form.value.transcriptor,
        primerRevisor: this.form.value.primerRevisor,
        segundoRevisor: this.form.value.segundoRevisor,
        textopaleografico: this.form.value.textopaleografico,
        textocritico: this.form.value.textocritico,
        creationdate: new Date()
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
