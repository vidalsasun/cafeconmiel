import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { file } from '../../../../models/mongo/files';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  constructor(private http: HttpClient) {
  }

  post(model: file): Observable<any> {
    return this.http.post('/api/files', JSON.stringify(model), {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    })
  }
  put(model: file): Observable<any> {
    return this.http.put('/api/files/' + model.id, JSON.stringify(model), {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    })
  }
  getAll(): Observable<Array<file>> {
    return this.http.get<Array<file>>('/api/files');
  }
  get(document: string): Observable<Array<file>> {
    return this.http.get<Array<file>>('/api/files/' + document);
  }
  delete(file: file): Observable<any> {
    return this.http.delete('/api/files/' + file)
  }
}
