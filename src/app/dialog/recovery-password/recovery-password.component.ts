import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationComponent } from '../confirmation/confirmation.component';

@Component({
  selector: 'app-recovery-password',
  templateUrl: './recovery-password.component.html',
  styleUrls: ['./recovery-password.component.css']
})
export class RecoveryPasswordComponent implements OnInit {

  codeOtpRecovery:any
  passwordRecovery:any;
  emailRecovery:any;

  constructor(@Inject(MAT_DIALOG_DATA) public data:string, private matDialogRef: MatDialogRef<ConfirmationComponent>) { }

  ngOnInit(): void {
  }

  onDestroy(){
    this.matDialogRef.close();
  }

  onValidate(){
    this.matDialogRef.close();
  }

  saveData(){
    localStorage.setItem('otpCodeRecovery',this.codeOtpRecovery);
    localStorage.setItem('passwordRecovery',this.passwordRecovery);
    //localStorage.setItem('emailRecovery',this.emailRecovery);
    //console.log(this.codeOtp);
  }

}
