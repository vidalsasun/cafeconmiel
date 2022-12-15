import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, NgModel, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { user } from '../../../models/mongo/users';
import { UsersService } from '../../../services/http/mongo/users/users.service';

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.css']
})
export class UsersFormComponent implements OnInit {

  local_data: user;

  form!: FormGroup;

  constructor(private usersService: UsersService,
    private builder: FormBuilder,
    public dialogRef: MatDialogRef<UsersFormComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: user) {

    this.local_data = { ...data };
  }

  ngOnInit(): void {

    this.form = this.builder.group({}, {      
      updateOn: 'change',
    });
    this.form.addControl("id", new FormControl((this.local_data ? this.local_data.id : ''), Validators.required));
    this.form.addControl("name", new FormControl((this.local_data ? this.local_data.name : ''), Validators.required));
    this.form.addControl("login", new FormControl((this.local_data ? this.local_data.login : ''), Validators.required));
    this.form.addControl("password", new FormControl((this.local_data ?this.local_data.pass : ''), Validators.required));
  }

  onFormSubmit() {
    if (!this.local_data.id) {
      this.usersService.post({
        name: this.form.value.name,
        login: this.form.value.login,
        pass: this.form.value.password,
        isadmin: false,
        creationdate: new Date()
      }).subscribe((result: user) => {
        if (result) {
          this.dialogRef.close(result);
        }
      }, err => {
        console.log(err)
      });
    }
    else {
      this.usersService.update({
        id: this.form.value.id,
        name: this.form.value.name,
        login: this.form.value.login,
        pass: this.form.value.password,
        isadmin: false,
        creationdate: new Date()
      }).subscribe((result: user) => {
        if (result) {
          this.dialogRef.close(result);
        }
      }, err => {
        console.log(err)
      });
    }
  }
}
