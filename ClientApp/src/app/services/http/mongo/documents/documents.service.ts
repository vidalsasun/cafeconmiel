import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { document } from '../../../../models/mongo/documents';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {

  constructor(private http: HttpClient) {
  }

  post(model: document): Observable<any> {
    return this.http.post('/api/documents', JSON.stringify(model), {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    })
  }
  getAll(): Observable<Array<document>> {
    return this.http.get<Array<document>>('/api/documents');
  }
  get(parameter: HttpParams): Observable<any> {
    return this.http.get<Array<document>>('/api/documents', { params: parameter });
  }
  delete(doc: document): Observable<any> {
    return this.http.delete('/api/documents/' + doc)
  }
}
