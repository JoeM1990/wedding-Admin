import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ErrorComponent } from 'src/app/dialog/error/error.component';
import { SuccessComponent } from 'src/app/dialog/success/success.component';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contactForm:FormGroup;

  constructor(public formBuilder:FormBuilder
    , public dialog:MatDialog) { 
    this.contactForm=this.formBuilder.group(
      {
      name: ['',[Validators.required, Validators.pattern("[a-zA-Z ]*")]],
      email: ['',[Validators.required,Validators.pattern("[^ @]*@[^ @]*"),]],
      message: ['',[Validators.required,]],
      }
    )
  }

  ngOnInit(): void {
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

  dialogSuccess(message:any){
    const timeout=1700;

      let dialogRef=this.dialog.open(SuccessComponent,{data:message});

        dialogRef.afterOpened().subscribe(_ => {
          setTimeout(() => {
             dialogRef.close();
          }, timeout)
        })
  }

  sendMessage(){
    if(this.contactForm.valid){
      this.dialogSuccess("Success");
      window.location.reload()
    }else{
      this.dialogError("Le formulaire est vide ou mal rempli")
    }
  }

}
