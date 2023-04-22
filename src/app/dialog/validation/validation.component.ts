import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { color } from 'html2canvas/dist/types/css/types/color';

@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.css']
})
export class ValidationComponent implements OnInit {

  codeOtp:any

  constructor(@Inject(MAT_DIALOG_DATA) public data:string, private matDialogRef: MatDialogRef<ConfirmationComponent>) { }

  ngOnInit(): void {
  }

  onDestroy(){
    this.matDialogRef.close();
  }

  onValidate(){
    this.matDialogRef.close();
  }

  saveOtp(){
    localStorage.setItem('otpCode',this.codeOtp);
    //console.log(this.codeOtp);
  }
}
