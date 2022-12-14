import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { user } from '../../../../models/mongo/users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) {
  }

  post(model: user): Observable<any> {
    return this.http.post('/api/users', JSON.stringify(model), {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    })
  }
  getAll(): Observable<Array<user>> {
    return this.http.get<Array<user>>('/api/users');
  }
  get(parameter: HttpParams): Observable<any> {
    return this.http.get<Array<user>>('/api/users', { params: parameter });
  }
  delete(userid: user): Observable<any> {
    return this.http.delete('/api/users/' + userid.id)
  }
}
