import { Component, OnInit } from '@angular/core';
import { ClaimService } from './services/http/token/claim.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {


  constructor(private claimService: ClaimService)
  { };


  ngOnInit(): void {
    this.claimService.getClaim("lalero").subscribe(result => {
      return result.token;
      //this.localService.setJsonValue('appId', result.token);
    });    
  }
  title = 'app';
}
