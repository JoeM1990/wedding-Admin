import { NgIfContext, Time } from '@angular/common';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ConfirmationComponent } from 'src/app/dialog/confirmation/confirmation.component';

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

  isDisabled=true;
 

 

  constructor(public auth:AuthService,public formBuilder: FormBuilder, 
    public crud:CrudService,public router:Router, public dialog:MatDialog) { 
    this.adminForm = this.formBuilder.group({
      username: ['',{validators: [Validators.required, ], }],
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

    let refDialog=this.dialog.open(ConfirmationComponent,{data:'Voulez-vous ajouter cet utilisateur ?'});


    refDialog.afterClosed().subscribe(res=>{
      if(res == 'true'){
            this.crud.addUser(this.adminForm.value)
        .subscribe(
          response =>{
            if(response){
              //window.location.reload();
            }
          },
          error =>{
            //alert(error['message']);
          }
        );
      }
    })
    
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

    let refDialog=this.dialog.open(ConfirmationComponent,{data:'Voulez-vous modifier cet utilisateur ?'});


    refDialog.afterClosed().subscribe(res=>{
      if(res == 'true'){
        this.crud.updateUserById(id,this.updateForm.value)
        .subscribe(
            response => {
              if(response){
                //window.location.reload();
              }
        
            },
              error => {
                console.log(error)
              });
      }
    })
      
  }

  deleteUserById(id:any){

    let refDialog=this.dialog.open(ConfirmationComponent,{data:'Voulez-vous supprimer cet utilisateur ?'});


    refDialog.afterClosed().subscribe(res=>{
      if(res == 'true'){
          this.crud.deleteUserById(id)
      .subscribe(
        response => {
          if(response){
           // window.location.reload();
          }
          
        },
        error => {
          console.log(error)
        });
      }
    })

  }

  onConfirmation(){
    
    let refDialog=this.dialog.open(ConfirmationComponent,{data:'Voulez-vous vous Deconnecter ?'});


    refDialog.afterClosed().subscribe(res=>{
      if(res == 'true'){
        this.auth.logoutApi();
      }
    })
  }


}
