import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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

  constructor(public auth:AuthService,public crud:CrudService, public dialog:MatDialog) { }

  ngOnInit(): void {
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
