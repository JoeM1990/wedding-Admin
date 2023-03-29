import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subject } from 'rxjs';
import { ConfirmationComponent } from 'src/app/dialog/confirmation/confirmation.component';
import { AuthService } from 'src/app/utils/auth/auth.service';
import { CrudService } from 'src/app/utils/crud/crud.service';

@Component({
  selector: 'app-comple-client',
  templateUrl: './comple-client.component.html',
  styleUrls: ['./comple-client.component.css']
})
export class CompleClientComponent implements OnInit {

  //dtOptions: DataTables.Settings={};

  // dataParams: any = {  
  //   page_num: '',  
  //   page_size: ''  
  // };  
  
  user:any;
  clientForm:FormGroup;
  updateForm:FormGroup;

  idUpdate:any;

  checkingRole=true;

  // options = {}
  // data = [];
  // columns: any = {};
  // rows={};

  constructor(public auth:AuthService, public formBuilder:FormBuilder, 
    public crud:CrudService, public router:Router, public dialog:MatDialog, private cookieService: CookieService) {
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

    // this.dataParams.page_num = 1;  
    // this.dataParams.page_size = 5;  

    // this.dtOptions = {
    //   pagingType: 'full_numbers',
    //   pageLength:5,
    //   processing:true
    // }

  //     this.columns = [
  //     { key: 'username', title: "Username" },
  //     { key: 'email', title: 'Email' },
  //     { key: 'role', title: 'Role' },
  //     { key: 'status', title: 'Status'},
  //     { key: 'actions', title: 'Actions' }
  // ]
    
    this.checkRole();


    this.crud.getAllUserApi()
    .subscribe(
      response => {
        this.user=response;
      },
      error => {
        //console.log(error)
      });
  }

  addUser(){

    let refDialog=this.dialog.open(ConfirmationComponent,{data:'Voulez-vous ajouter cet utilisateur ?'});


    refDialog.afterClosed().subscribe(res=>{
      if(res == 'true'){
            this.crud.addUser(this.clientForm.value)
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
        //console.log(error)
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
            //    console.log(error)
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
            //window.location.reload();
          }
          
        },
        error => {
          //console.log(error)
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

  checkRole(){
    if(this.cookieService.get('role')=='Client'){
      this.checkingRole=false;
    }
  }

}
