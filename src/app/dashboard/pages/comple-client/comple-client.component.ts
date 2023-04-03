import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subject } from 'rxjs';
import { ConfirmationComponent } from 'src/app/dialog/confirmation/confirmation.component';
import { AuthService } from 'src/app/utils/auth/auth.service';
import { CrudService } from 'src/app/utils/crud/crud.service';
import { User } from 'src/app/utils/model/user';

import { MatTableDataSource } from '@angular/material/table';
import { DataTableDirective } from 'angular-datatables';
import  *  as CryptoJS from  'crypto-js';

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

  checkingRole=true;
  checkingRole2=false;

  status:any;

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

  // ngAfterViewInit() {
  //   //this.dataSource.sort = this.sort;
  //   this.dataSource.paginator = this.paginator;
  //   this.dtTrigger.next()
  // }   

  // ngAfterViewInit(): void {
  //   this.dtTrigger.next(null);
  // }

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
        this.idUpdate=response['id'];

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

    let roleCheck=this.getData('role');

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


  initDataTable(){
    $(document).ready(function() {
      var table = $('#dataExampleTable').DataTable( {
        pagingType: 'full_numbers',
        pageLength: 5,
        processing: true,
        lengthMenu: [5],
      } );
  } );
  }

  initDataTable2(){
    $(document).ready(function(){
      $("#dataExampleTable #checkall").click(function () {
              if ($("#dataExampleTable #checkall").is(':checked')) {
                  $("#dataExampleTable input[type=checkbox]").each(function () {
                      $(this).prop("checked", true);
                  });
      
              } else {
                  $("#mytable input[type=checkbox]").each(function () {
                      $(this).prop("checked", false);
                  });
              }
          });
          
          //$("[data-toggle=tooltip]").tooltip();
      });
      
  }
}
