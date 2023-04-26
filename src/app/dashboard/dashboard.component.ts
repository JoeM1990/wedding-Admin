import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { ConfirmationComponent } from '../dialog/confirmation/confirmation.component';
import { AuthService } from '../utils/auth/auth.service';
import { CrudService } from '../utils/crud/crud.service';
import  *  as CryptoJS from  'crypto-js';
import { WaitingComponent } from '../dialog/waiting/waiting.component';

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
  checkingRole3=false;

  transactions:any;

  updateForm:FormGroup;
  idUpdate:any;

  forfaitUser:any;
  emailUser:any;

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
    
    let refDialog=this.dialog.open(ConfirmationComponent,{data:'Voulez-vous vous Déconnecter ?'});


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
      //this.checkingRole3=false;
    }else if(roleCheck=='Admin'){
      this.checkingRole2=false;
      this.checkingRole3=true;
      //this.checkingRole3=true;
    }else{
      this.auth.logoutApi();
    }
  }



  updateTransaction(id:any){

    let refDialog=this.dialog.open(ConfirmationComponent,{data:'Voulez-vous modifier cette transaction ?'});


    refDialog.afterClosed().subscribe(res=>{
      if(res == 'true'){


        let dialogRef=this.dialog.open(WaitingComponent);

        dialogRef.afterOpened().subscribe(_ => {
          setTimeout(() => {
         dialogRef.close();


         this.crud.updateTransactionById(id,this.updateForm.value)
        .subscribe(
            response => {

              if(this.updateForm.controls['status'].value=="Valide"){
                this.crud.addPaiement(this.emailUser,this.forfaitUser).subscribe(res=>{

                });
              }else if(this.updateForm.controls['status'].value=="NonValide"){
                this.crud.desapprouvePaiement(this.emailUser,this.forfaitUser).subscribe(res=>{

                });
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

  getTransactionById(id:any){
    this.crud.getTransactionById(id)
    .subscribe(
      response => {
        this.idUpdate=response['id']
        this.forfaitUser=response['forfait']
        this.emailUser=response['email'];

        this.updateForm = this.formBuilder.group({
          status: response['status'],
        })
      },
      error => {
        //console.log(error)
      });
  }

  deleteTransactionById(id:any){

    let refDialog=this.dialog.open(ConfirmationComponent,{data:'Voulez-vous supprimer cette transaction ?'});


    refDialog.afterClosed().subscribe(res=>{
      if(res == 'true'){


        let dialogRef=this.dialog.open(WaitingComponent);

        dialogRef.afterOpened().subscribe(_ => {
          setTimeout(() => {
         dialogRef.close();

         this.crud.deleteTransactionById(id)
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


}
