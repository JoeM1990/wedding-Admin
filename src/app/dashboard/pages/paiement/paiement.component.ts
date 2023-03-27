import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationComponent } from 'src/app/dialog/confirmation/confirmation.component';
import { AuthService } from 'src/app/utils/auth/auth.service';
import { CrudService } from 'src/app/utils/crud/crud.service';

@Component({
  selector: 'app-paiement',
  templateUrl: './paiement.component.html',
  styleUrls: ['./paiement.component.css']
})
export class PaiementComponent implements OnInit {

  paiement:any;

  constructor(public dialog:MatDialog, public auth:AuthService, public crud:CrudService) { }

  ngOnInit(): void {
    this.crud.getAllPaiementApi()
    .subscribe(
      response => {
        this.paiement=response;
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

}
