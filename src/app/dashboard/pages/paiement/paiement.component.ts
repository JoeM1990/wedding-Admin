import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { ConfirmationComponent } from 'src/app/dialog/confirmation/confirmation.component';
import { AuthService } from 'src/app/utils/auth/auth.service';
import { CrudService } from 'src/app/utils/crud/crud.service';
import  *  as CryptoJS from  'crypto-js';

@Component({
  selector: 'app-paiement',
  templateUrl: './paiement.component.html',
  styleUrls: ['./paiement.component.css']
})
export class PaiementComponent implements OnInit {

  paiement:any;

  user:any;

  checkingRole=true;
  checkingRole2=true;
  checkingRole3=false;
  

  getEmail:any;

  constructor(public dialog:MatDialog, public auth:AuthService, public crud:CrudService,
    private cookieService: CookieService) { }

  ngOnInit(): void {

    this.getEmail=localStorage.getItem('email_user');

    this.checkRole();

    this.crud.getAllPaiementApi()
    .subscribe(
      response => {
        this.paiement=response;
      },
      error => {
        //console.log(error)
      });

      this.crud.getAllUserApi()
    .subscribe(
      response => {
        this.user=response;
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

  deleteCreditById(id:any){

    let refDialog=this.dialog.open(ConfirmationComponent,{data:'Voulez-vous supprimer ce credit ?'});


    refDialog.afterClosed().subscribe(res=>{
      if(res == 'true'){
          this.crud.deletePaiementById(id)
      .subscribe(
        response => {
          if(response){
           // window.location.reload();
          }
          
        },
        error => {
          //console.log(error)
        });
      }
    })

  }

  addForfait(email:any,forfait:any){
    let refDialog=this.dialog.open(ConfirmationComponent,{data:'Voulez-vous ajouter ce credit?'});


    refDialog.afterClosed().subscribe(res=>{
      if(res == 'true'){
            this.crud.addPaiement(email,forfait)
        .subscribe(
          response =>{
            if(response){
              //window.location.reload();
            }
          },
          error =>{
            console.log(error['message']);
          }
        );
      }
    })
  }

  checkRole(){

    let roleCheck=this.getData('role');

    if(roleCheck=='Client'){
      this.checkingRole=false;
      //this.checkingRole3=false;
    }else if(roleCheck=='Admin'){
      this.checkingRole2=false;
      this.checkingRole3=true;
      //this.checkingRole3=true;
    }
  }

  private decryptRole(txtToDecrypt: string) {
    return CryptoJS.AES.decrypt(txtToDecrypt, 'role').toString(CryptoJS.enc.Utf8);
  }

  public getData(key: string) {
    let data = this.cookieService.get(key)|| "";
    return this.decryptRole(data);
  }

  

}
