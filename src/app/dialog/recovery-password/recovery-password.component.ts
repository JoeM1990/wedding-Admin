import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { ErrorComponent } from '../error/error.component';

@Component({
  selector: 'app-recovery-password',
  templateUrl: './recovery-password.component.html',
  styleUrls: ['./recovery-password.component.css']
})
export class RecoveryPasswordComponent implements OnInit {

  codeOtpRecovery:any
  passwordRecovery:any;
  emailRecovery:any;

  status:any;

  constructor(@Inject(MAT_DIALOG_DATA) public data:string, 
  private matDialogRef: MatDialogRef<ConfirmationComponent>, public dialog:MatDialog) { }

  ngOnInit(): void {
  }

  onDestroy(){
    this.matDialogRef.close();
  }

  onValidate(){
    this.matDialogRef.close();
  }

  saveData(){

    if(!this.codeOtpRecovery && !this.passwordRecovery){
      this.dialogError('Veuillez remplir le formulaire')
      this.status="false";
    }else{
      this.status="true";
      localStorage.setItem('otpCodeRecovery',this.codeOtpRecovery);
      localStorage.setItem('passwordRecovery',this.passwordRecovery);
    }
    
    //localStorage.setItem('emailRecovery',this.emailRecovery);
    //console.log(this.codeOtp);
  }

  dialogError(message:any){
    const timeout=2900;

        let dialogRef=this.dialog.open(ErrorComponent,{data:message});

        dialogRef.afterOpened().subscribe(_ => {
          setTimeout(() => {
             dialogRef.close();
          }, timeout)
        })
  }


}
