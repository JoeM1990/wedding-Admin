import { NgIfContext, Time } from '@angular/common';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { ConfirmationComponent } from 'src/app/dialog/confirmation/confirmation.component';

import { AuthService } from 'src/app/utils/auth/auth.service';
import { CrudService } from 'src/app/utils/crud/crud.service';
import { User } from 'src/app/utils/model/user';
import  *  as CryptoJS from  'crypto-js';
import { WaitingComponent } from 'src/app/dialog/waiting/waiting.component';

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
 
  checkingRole=true;
  checkingRole2=false;

  status:any;

  constructor(public auth:AuthService,public formBuilder: FormBuilder, 
    public crud:CrudService,public router:Router, public dialog:MatDialog,private cookieService: CookieService) { 
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

  

    this.checkRole();

    this.crud.getAllUserApi()
    .subscribe(
      response => {
        this.user=response;
        //this.data=response;
      },
      error => {
        //console.log(error)
      });
  }

  addUser(){

    let refDialog=this.dialog.open(ConfirmationComponent,{data:'Voulez-vous ajouter cet utilisateur ?'});


    refDialog.afterClosed().subscribe(res=>{
      if(res == 'true'){


        let dialogRef=this.dialog.open(WaitingComponent);

        dialogRef.afterOpened().subscribe(_ => {
          setTimeout(() => {
         dialogRef.close();

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
         
         }, 1700)
        })

           
      }
    })
    
  }

  getUserById(id:any){
    this.crud.getUserById(id)
    .subscribe(
      response => {
        this.idUpdate=response['id']

        if(response['isApproved']==1){
          this.status="Activer"
        }else if(response['isApproved']==0){
          this.status="Desactiver";
        }

        this.updateForm = this.formBuilder.group({
          username: response['username'],
          email: response['email'],
          password: response['password'],
          role: response['role'],
          isApproved: this.status
        })
      },
      error => {
        //console.log(error)
      });
  }

  updateUserById(id:any){

    let refDialog=this.dialog.open(ConfirmationComponent,{data:'Voulez-vous modifier cet utilisateur ?'});


    refDialog.afterClosed().subscribe(res=>{
      if(res == 'true'){


        let dialogRef=this.dialog.open(WaitingComponent);

        dialogRef.afterOpened().subscribe(_ => {
          setTimeout(() => {
         dialogRef.close();

         this.crud.updateUserById(id,this.updateForm.value)
        .subscribe(
            response => {
              if(response){
                //window.location.reload();
              }
        
            },
              error => {
          //      console.log(error)
              });
         
         }, 1700)
        })

        
      }
    })
      
  }

  deleteUserById(id:any){

    let refDialog=this.dialog.open(ConfirmationComponent,{data:'Voulez-vous supprimer cet utilisateur ?'});


    refDialog.afterClosed().subscribe(res=>{
      if(res == 'true'){

        let dialogRef=this.dialog.open(WaitingComponent);

        dialogRef.afterOpened().subscribe(_ => {
          setTimeout(() => {
         dialogRef.close();

         this.crud.deleteUserById(id)
         .subscribe(
           response => {
             if(response){
              // window.location.reload();
             }
             
           },
           error => {
             //console.log(error)
           });
         
         }, 1700)
        })


         
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

  checkRole(){

    let roleKey=this.decryptRoleKey('role');
    let roleCheck=this.getData('xxxx-0000');

    if(roleCheck=='Client'){
      this.checkingRole=false;
    }else if(roleCheck=='Admin'){
      this.checkingRole2=true;
    }
  }

  private decryptRole(txtToDecrypt: string) {
    return CryptoJS.AES.decrypt(txtToDecrypt, 'role').toString(CryptoJS.enc.Utf8);
  }

  public getData(key: string) {
    let data = this.cookieService.get(key)|| "";
    return this.decryptRole(data);
  }

  private decryptRoleKey(txtToDecrypt: string) {
    return CryptoJS.AES.decrypt(txtToDecrypt, 'role').toString(CryptoJS.enc.Utf8);
  }

  public getDataKey(key: string) {
    let data = this.cookieService.get(key)|| "";
    return this.decryptRoleKey(data);
  }

  waitingDialog(){
    
    let refDialog=this.dialog.open(WaitingComponent,{data:'Voulez-vous vous Deconnecter ?'});


    refDialog.afterClosed().subscribe(res=>{
      
    })
  }


}
