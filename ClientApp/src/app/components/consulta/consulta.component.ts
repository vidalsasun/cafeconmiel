import { Component, OnInit } from '@angular/core';
import { document } from '../../models/mongo/documents';
import { DocumentsService } from '../../services/http/mongo/documents/documents.service';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {

  public docs: Array<document> | undefined;

  constructor(private docService: DocumentsService) {
    this.docs = new Array<document>();
  }

  ngOnInit(): void {
    this.docService.getAll().subscribe((result: Array<document>) => {
      if (result) {
        this.docs = result;
      }
    }, err => {
      console.log(err)
    }
    );
  }

}
