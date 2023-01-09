import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { reduxLoginModel } from './models/redux/login';
//import { MenuService } from './reactive/menu.service';
import { LoginActions, LoginSelectors } from './store/login';
import { LoginComponent } from './components/login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  token: string = '';
  isExpanded = false;
  loginredux!: reduxLoginModel;
  public op: string | undefined = 'p';

  constructor(//private menuService: MenuService,
    //private tokenService: TokenService,
    public dialog: MatDialog,
    private store: Store) {
    this.loginredux = new reduxLoginModel();
  }


  ngOnInit(): void {

    this.store.select(LoginSelectors.token).subscribe(result => {
      this.loginredux = result[0] as reduxLoginModel;
    }, err => {
      console.log(err.error);
    });

    /*this.tokenService.getToken.subscribe(option => {
      this.token = option;
    });*/
  }
  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
  setOptionMenu(option: string) {
    //this.menuService.setMenu(option);
    this.op = option;
  }
  closeConnection() {
    this.store.dispatch(LoginActions.disconectUser({ loginData: new reduxLoginModel() }));
    //this.tokenService.setToken('');
    //this.menuService.setMenu('p');
    this.op = 'p';
  }
  openLoginModal() {
    this.dialog.open(LoginComponent, {
      data: null
    }).afterClosed().subscribe(res => {
      //this.getAllDocuments();
    });
  }
  title = 'app';
}
