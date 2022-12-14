import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, NgModel, Validators } from '@angular/forms';

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.css']
})
export class UsersFormComponent implements OnInit {

  form!: FormGroup;

  constructor(private builder: FormBuilder) { }

  ngOnInit(): void {
    this.form.addControl("name", new FormControl("name", Validators.required));
  }

  onFormSubmit() {

  }
}
