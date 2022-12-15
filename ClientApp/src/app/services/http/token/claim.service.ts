import { Inject, Injectable } from '@angular/core';
import { UserClaimsModel } from '../../../models/token/UserClaimsModel';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { reduxLoginModel } from '../../../models/redux/login';

@Injectable({
  providedIn: 'root'
})
export class ClaimService {  
  claim: UserClaimsModel;

  constructor(private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string,  ) {
    this.claim = new UserClaimsModel();
  }

  getClaim(appKey: string, appPass: string): Observable<any> {

    this.claim.code = appPass;
    this.claim.app = appKey;

    return this.http.post(this.baseUrl + 'api/Login', JSON.stringify(this.claim), {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }
}
