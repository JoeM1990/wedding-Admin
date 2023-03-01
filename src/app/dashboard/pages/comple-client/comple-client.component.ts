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
  updateForm:FormGroup;

  constructor(public auth:AuthService, public formBuilder:FormBuilder, 
    public crud:CrudService, public router:Router) {
    this.clientForm = this.formBuilder.group({
      username: [''],
      email: [''],
      password: [''],
      role: [''],
      isApproved: ['']
    })

    this.updateForm = this.formBuilder.group({
      username: [''],
      email: [''],
      password: [''],
      role: [''],
      isApproved: ['']
    })
   }

  ngOnInit(): void {
    this.crud.getAllUserApi()
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

  getUserById(id:any){
    this.crud.getUserById(id)
    .subscribe(
      response => {
        this.updateForm = this.formBuilder.group({
          username: response['username'],
          email: response['email'],
          password: response['password'],
          role: response['password'],
          isApproved: response['isApproved']
        })
      },
      error => {
        console.log(error)
      });
  }

}
