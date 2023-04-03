import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationComponent } from 'src/app/dialog/confirmation/confirmation.component';
import { CrudService } from 'src/app/utils/crud/crud.service';
import  *  as CryptoJS from  'crypto-js';

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
      email: localStorage.getItem('email_user'),
      forfait:[''],
      operateur:[''],
      reference:[''],
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
            this.crud.addTransaction(this.transactionForm.value)
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

}
