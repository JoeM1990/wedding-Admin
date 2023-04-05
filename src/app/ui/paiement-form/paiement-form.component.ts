import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationComponent } from 'src/app/dialog/confirmation/confirmation.component';
import { CrudService } from 'src/app/utils/crud/crud.service';
import  *  as CryptoJS from  'crypto-js';
import { WaitingComponent } from 'src/app/dialog/waiting/waiting.component';
import { ErrorComponent } from 'src/app/dialog/error/error.component';

@Component({
  selector: 'app-paiement-form',
  templateUrl: './paiement-form.component.html',
  styleUrls: ['./paiement-form.component.css']
})
export class PaiementFormComponent implements OnInit {

  montant:any;
  forfaitt:any;

  transactionForm:FormGroup;

  constructor(public crud:CrudService,public dialog:MatDialog,public formBuilder: FormBuilder) { 
    this.transactionForm = this.formBuilder.group({
      email: this.getDataEmail('yyyy-0000'),
      forfait:this.forfaitt,
      operateur:['',[Validators.required]],
      reference:['',[Validators.required, Validators.minLength(6), Validators.pattern("[a-zA-Z ]*")]],
      status:"NonValide"
    })
  }

  ngOnInit(): void {
    this.getAmount();
  }

  getAmount(){
    this.montant= localStorage.getItem('mt-a-payer');
    this.forfaitt= localStorage.getItem('forfait-a-payer');
  }

  addTransaction(){

      let refDialog=this.dialog.open(ConfirmationComponent,{data:'Voulez-vous ajouter cette reference?'});


      refDialog.afterClosed().subscribe(res=>{
        if(res == 'true'){
  
  
          let dialogRef=this.dialog.open(WaitingComponent);
  
          dialogRef.afterOpened().subscribe(_ => {
            setTimeout(() => {
           dialogRef.close();
  
           this.crud.addTransaction(this.transactionForm.value)
          .subscribe(
            response =>{
              if(response){
                //window.location.reload();
              }
            },
            error =>{
              //console.log(error['message']);
            }
          );
           
           }, 1700)
          })
  
          
              
        }
      })
 
   
  }

  private decryptEmail(txtToDecrypt: string) {
    return CryptoJS.AES.decrypt(txtToDecrypt, 'email_user').toString(CryptoJS.enc.Utf8);
  }
  
  public getDataEmail(key: string) {
    let data = localStorage.getItem(key)|| "";
    return this.decryptEmail(data);
  }


  dialogError(message:any){
    const timeout=1400;

        let dialogRef=this.dialog.open(ErrorComponent,{data:message});

        dialogRef.afterOpened().subscribe(_ => {
          setTimeout(() => {
             dialogRef.close();
          }, timeout)
        })
  }

}
