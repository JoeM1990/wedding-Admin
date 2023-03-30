import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { ConfirmationComponent } from '../dialog/confirmation/confirmation.component';
import { AuthService } from '../utils/auth/auth.service';
import { CrudService } from '../utils/crud/crud.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  

  countUser:any;
  countUserActive:any;
  countUserDesactive:any;

  countTransactionActive:any;
  countTransactionDesactive:any;

  checkingRole=true;
  checkingRole2=true;

  transactions:any;

  updateForm:FormGroup;
  idUpdate:any;

  constructor(public auth:AuthService,public crud:CrudService, public dialog:MatDialog,
    private cookieService: CookieService, private formBuilder:FormBuilder) { 
      this.updateForm = this.formBuilder.group({
        status: ['',{validators: [Validators.required, ],}],
      })
    }

  ngOnInit(): void {

    this.checkRole();

    this.crud.countUser()
    .subscribe(
      response => {
        this.countUser=response["value"]
      },
      error => {
        //console.log(error)
      });

      this.crud.countUserActive()
    .subscribe(
      response => {
        this.countUserActive=response["value"]
      },
      error => {
        //console.log(error)
      });

      this.crud.countUserDesactive()
    .subscribe(
      response => {
        this.countUserDesactive=response["value"]
      },
      error => {
        //console.log(error)
      });

      this.crud.countTransactionActive()
    .subscribe(
      response => {
        this.countTransactionActive=response["value"]
      },
      error => {
        //console.log(error)
      });

      this.crud.countTransactionDesactive()
    .subscribe(
      response => {
        this.countTransactionDesactive=response["value"]
      },
      error => {
        //console.log(error)
      });

      this.crud.getAllTransactionApi()
      .subscribe(
        response => {
          this.transactions=response;
        },
        error => {
          //console.log(error)
        });
  

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
    }else if(this.cookieService.get('role')=='Admin'){
      this.checkingRole2=false;
    }
  }



  updateTransaction(id:any){

    let refDialog=this.dialog.open(ConfirmationComponent,{data:'Voulez-vous modifier cette transaction ?'});


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
          //      console.log(error)
              });
      }
    })
      
  }

  getTransactionById(id:any){
    this.crud.getTransactionById(id)
    .subscribe(
      response => {
        this.idUpdate=response['id']

        this.updateForm = this.formBuilder.group({
          status: response['status'],
        })
      },
      error => {
        //console.log(error)
      });
  }


}
