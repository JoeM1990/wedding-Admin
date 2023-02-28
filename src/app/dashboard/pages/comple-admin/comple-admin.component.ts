import { NgIfContext } from '@angular/common';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/utils/auth/auth.service';
import { User } from 'src/app/utils/model/user';

@Component({
  selector: 'app-comple-admin',
  templateUrl: './comple-admin.component.html',
  styleUrls: ['./comple-admin.component.css']
})
export class CompleAdminComponent implements OnInit {

  user:any;
  elseBlock:any;
  // thenBlock:any

  adminForm:FormGroup;

 

  constructor(public auth:AuthService,public formBuilder: FormBuilder) { 
    this.adminForm = this.formBuilder.group({
      username: [''],
      email: [''],
      password: [''],
      role: [''],
    })
  }

  ngOnInit(): void {
    this.auth.getAllUserApi()
    .subscribe(
      response => {
        this.user=response;
      },
      error => {
        console.log(error)
      });
  }

}
