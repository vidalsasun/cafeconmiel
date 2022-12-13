import { Component } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { TokenService } from "../../reactive/login.service";
import { MenuService } from "../../reactive/menu.service";
import { ClaimService } from "../../services/http/token/claim.service";

@Component({
  selector: "app-login",
  templateUrl: './login.component.html',
  styleUrls: ["./login.component.css"]
})
export class LoginComponent {
  username: string | undefined;
  password: string | undefined;
  loginResult: string | undefined;

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(public fb: FormBuilder, public claimService: ClaimService, private tokenService: TokenService, private menuService: MenuService,) {    
  }
  
  onFormSubmit() {
    if (this.form.valid) {
      this.claimService.getClaim(this.form.value.username, this.form.value.password).subscribe(response => {
        const r = response;
        this.tokenService.setToken(r.token);
        this.menuService.setMenu('a');
        //this.loginResult = "login ok";
      }, error => {
        this.loginResult = "login error, try again";
      });;
    }    
  }
}
