import { NgIfContext, Time } from '@angular/common';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from 'src/app/utils/auth/auth.service';
import { CrudService } from 'src/app/utils/crud/crud.service';
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
  updateForm:FormGroup;

  idUpdate:any;
 

 

  constructor(public auth:AuthService,public formBuilder: FormBuilder, 
    public crud:CrudService,public router:Router) { 
    this.adminForm = this.formBuilder.group({
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
    // this.timerSubscription = Observable.timer(5000)
    //   .subscribe(() => {
        
    //   });

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
    if(confirm("Voulez vous ajouter cet utilisateur")){
      this.crud.addUser(this.adminForm.value)
    .subscribe(
      response =>{
        if(response){
          window.location.reload();
        }
        
      },
      error =>{
        alert(error['message']);
      }
    );
    }
    
    
  }

  getUserById(id:any){
    this.crud.getUserById(id)
    .subscribe(
      response => {
        this.idUpdate=response['id']

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

  updateUserById(id:any){
    if(confirm("Voulez vous modifier cet utilisateur")){
      this.crud.updateUserById(id,this.updateForm.value)
    .subscribe(
      response => {
        if(response){
          window.location.reload();
        }
        
      },
      error => {
        console.log(error)
      });
    }
      
  }

  deleteUserById(id:any){
    if(confirm("Voulez vous supprimer cet utilisateur")){
      this.crud.deleteUserById(id)
    .subscribe(
      response => {
        if(response){
          window.location.reload();
        }
        
      },
      error => {
        console.log(error)
      });
    }
    
  }

}
