import { Inject, Injectable } from '@angular/core';
import { UserClaimsModel } from '../../../models/token/UserClaimsModel';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClaimService {  
  claim: UserClaimsModel;

  constructor(private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string,  ) {
    this.claim = new UserClaimsModel();
  }

  getClaim(appKey: string): Observable<any> {

    this.claim.App = appKey;
    this.claim.Code = 'lalero';
    return this.http.post(this.baseUrl + 'api/Login', JSON.stringify(this.claim), {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    })
  }
}
