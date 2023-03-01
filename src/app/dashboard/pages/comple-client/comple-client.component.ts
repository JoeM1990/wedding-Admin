import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/utils/auth/auth.service';
import { CrudService } from 'src/app/utils/crud/crud.service';

@Component({
  selector: 'app-comple-client',
  templateUrl: './comple-client.component.html',
  styleUrls: ['./comple-client.component.css']
})
export class CompleClientComponent implements OnInit {

  user:any;
  clientForm:FormGroup;

  constructor(public auth:AuthService, public formBuilder:FormBuilder, 
    public crud:CrudService, public router:Router) {
    this.clientForm = this.formBuilder.group({
      username: [''],
      email: [''],
      password: [''],
      role: [''],
      isApproved: true
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

  addUser(){
    this.crud.addUser(this.clientForm.value)
    .subscribe(
      response =>{
        this.router.navigate(['/compte-client']);
      },
      error =>{
        alert(error['message']);
      }
    );
    
  }

}
