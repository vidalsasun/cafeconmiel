import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { Store } from "@ngrx/store";
import { reduxLoginModel } from "../../models/redux/login";
//import { TokenService } from "../../reactive/login.service";
import { MenuService } from "../../reactive/menu.service";
import { ClaimService } from "../../services/http/token/claim.service";
import { LoginActions } from "../../store/login";

@Component({
  selector: "app-login",
  templateUrl: './login.component.html',
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  username: string | undefined;
  password: string | undefined;
  loginResult: string | undefined;
  loginredux!: reduxLoginModel;


  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(public fb: FormBuilder,
    public claimService: ClaimService,
    //private tokenService: TokenService,
    public dialogRef: MatDialogRef<LoginComponent>,
    private menuService: MenuService,
    private store: Store) {
    this.loginredux = new reduxLoginModel();
  }
    ngOnInit(): void {
      this.store.dispatch(LoginActions.init());
    }
  
  onFormSubmit() {
    if (this.form.valid) {
      this.claimService.getClaim(this.form.value.username, this.form.value.password).subscribe(response => {
        const r = response;

        // TODO QUITAR ESTE SERVICIO
        //this.tokenService.setToken(r.token);
        this.loginredux.token = r.rModel.token;
        this.loginredux.isAdmin = r.rModel.isAdmin;
        this.loginredux.userId = r.rModel.userId;

        this.store.dispatch(LoginActions.loginUser({ loginData: this.loginredux }));
        this.menuService.setMenu('p');
        this.dialogRef.close();
        /*if (r.rModel.isAdmin) {
          this.menuService.setMenu('a');
        }
        else {
          this.menuService.setMenu('d');
        }*/
        //this.loginResult = "login ok";
      }, error => {
        this.loginResult = "login error, try again";
      });;
    }    
  }
}
