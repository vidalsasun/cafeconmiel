import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { reduxLoginModel } from './models/redux/login';
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

  constructor(
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
    this.op = option;
  }
  closeConnection() {
    this.store.dispatch(LoginActions.disconectUser({ loginData: new reduxLoginModel() }));
    this.op = 'p';
  }
  openLoginModal() {
    this.dialog.open(LoginComponent, {
      data: null,
    }).afterClosed().subscribe(res => {
      //this.getAllDocuments();
    });
  }
  title = 'app';
}
