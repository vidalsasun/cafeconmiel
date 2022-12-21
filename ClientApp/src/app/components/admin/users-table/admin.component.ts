import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { user } from '../../../models/mongo/users';
import { UsersService } from '../../../services/http/mongo/users/users.service';
import { UsersFormComponent } from '../users-form/users-form.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  users!: Array<user>;
  dataSource!: Array<user>;
  loaded: boolean = false;


  constructor(private usersService: UsersService, public dialog: MatDialog) {
    this.users = new Array<user>();
  }
  ngAfterViewInit() {
    this.getAllUsers();
  }
  getAllUsers() {
    this.usersService.getAll().subscribe((result: Array<user>) => {
      if (result) {
        this.users = result;
        this.dataSource = [...this.users];
        this.loaded = true;
      }
    }, err => {
      console.log(err)
    });
  }
  ngOnInit(): void {
    /*this.usersService.post({
      name: 'admin',
      login: 'admincfm',
      pass: 'cfmadmin',
      isadmin: true,
      creationdate: new Date()
    }).subscribe((result: user) => {
      if (result) {
        let u = result;
      }
    }, err => {
      console.log(err)
    }); */
  }


  displayedColumns: string[] = [  
    'name',
    'login',
    'isadmin',
    'creationdate',
    'editaction',
    'deleteaction'
  ];

  @ViewChild(MatTable)
    table!: MatTable<user>;

  createUser() {
    this.dialog.open(UsersFormComponent, {
      data: null
    }).afterClosed().subscribe(res => {
      this.getAllUsers();
    });
  }
  deleteUser(event: any) {
    this.usersService.delete(event.id).subscribe((result: user) => {
      this.getAllUsers();
    }, err => {
      console.log(err)
    });
  }
  editUser(event: any) {   
    this.dialog.open(UsersFormComponent,{      
      data: event
    }).afterClosed().subscribe(res => {
      if (res) {
        let v = res.user;
        this.getAllUsers();
      }
    });
  }
}
