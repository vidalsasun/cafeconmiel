import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { user } from '../../../models/mongo/users';
import { UsersService } from '../../../services/http/mongo/users/users.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  users!: Array<user>;
  dataSource!: Array<user>;
  loaded: boolean = false;


  constructor(private usersService: UsersService) {
    this.users = new Array<user>();
  }
  ngAfterViewInit() {
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
    });*/   
  }


  displayedColumns: string[] = ['id', 'name', 'login', 'isadmin', 'creationdate'];

  @ViewChild(MatTable)
    table!: MatTable<user>;

  addData() {
    const randomElementIndex = Math.floor(Math.random() * this.users.length);
    this.dataSource.push(this.users[randomElementIndex]);
    this.table.renderRows();
  }

  removeData() {
    this.dataSource.pop();
    this.table.renderRows();
  }
}
