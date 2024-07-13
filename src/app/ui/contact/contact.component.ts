import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ErrorComponent } from 'src/app/dialog/error/error.component';
import { SuccessComponent } from 'src/app/dialog/success/success.component';
import { CrudService } from 'src/app/utils/crud/crud.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contactForm:FormGroup;

  constructor(public formBuilder:FormBuilder
    , public dialog:MatDialog, public crud:CrudService) { 
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
     
      let email = this.contactForm.controls['email'].value
      let username =  this.contactForm.controls['name'].value
      let message = this.contactForm.controls['message'].value


      this.crud.sendMailContact(email,message,username)
      .subscribe(
        response=>{
          alert('success')
        },
        error=>{
          alert(error)
        }
      )

      window.location.reload()
    }else{
      this.dialogError("Le formulaire est vide ou mal rempli")
    }
  }


}
