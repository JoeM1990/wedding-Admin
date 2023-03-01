import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  idUpdate:any;

  constructor(public auth:AuthService, public formBuilder:FormBuilder, 
    public crud:CrudService, public router:Router) {
    this.clientForm = this.formBuilder.group({
      username: ['',{validators: [Validators.required, ],}],
      email: ['',{validators: [Validators.required, Validators.email],}],
      password: ['',{validators: [Validators.required, Validators.maxLength(10) ], }],
      role: ['',{validators: [ Validators.required, ], }],
      isApproved: ['',{validators: [ Validators.required, ], }]
    })

    this.updateForm = this.formBuilder.group({
      username: ['',{validators: [Validators.required, ],}],
      email: ['',{validators: [Validators.required, Validators.email],}],
      password: ['',{validators: [Validators.required, Validators.maxLength(10) ], }],
      role: ['',{validators: [ Validators.required, ], }],
      isApproved: ['',{validators: [ Validators.required, ], }]
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
    if(confirm("Voulez vous ajouter cet utilisateur")){
      this.crud.addUser(this.clientForm.value)
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
