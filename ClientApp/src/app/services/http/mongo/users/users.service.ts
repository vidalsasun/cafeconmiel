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
  update(model: user): Observable<any> {
    return this.http.put('/api/users', JSON.stringify(model), {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    })
  }

  getAll(): Observable<Array<user>> {
    return this.http.get<Array<user>>('/api/users');
  }
  get(userId: string): Observable<any> {
    return this.http.get<user>('/api/users/' + userId);
  }
  delete(userid: string): Observable<any> {
    return this.http.delete('/api/users/' + userid)
  }
}
