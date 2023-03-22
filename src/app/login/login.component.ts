import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ErrorComponent } from '../dialog/error/error.component';
import { AuthService } from '../utils/auth/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  registerForm:FormGroup;

  constructor(public auth:AuthService, public router:Router, public formBuilder:FormBuilder, public dialog:MatDialog) {
    this.registerForm=this.formBuilder.group(
      {
      username: [''],
      email: [''],
      password: [''],
      role: 'Client',
      isApproved: true
      }
    )
   }

  ngOnInit(): void {
  }

  login(email:any,password:any){
    this.auth.login(email,password);
  }

  loginApi(email:any,password:any){
    this.auth.loginApi(email,password)
    .subscribe(
      response => {
       // alert(response['message'])
        let token=response['token'];
        //let data=response['data'];

        if(token){
          this.router.navigate(['/dashboard']);
        }

        // if(data != null){
        //   this.router.navigate(['/dashboard']);
        // }else{
        //   this.router.navigate(['/login']);
        // }
        localStorage.setItem('token',token);
        localStorage.setItem('email_user',email);
      },
      error => {
        this.dialogError('Erreur de connexion');
        this.router.navigate(['/login']);
        ///alert(error);
        console.log(error);
      });
  }

  registerUser(){
    this.auth.registerApi(this.registerForm.value)
    .subscribe(
      response => {
        this.router.navigate(['/login']);
      },
      error => {
        alert("Echec d'enregistrement");
      });
  }

  dialogError(message:any){
    const timeout=1200;

        let dialogRef=this.dialog.open(ErrorComponent,{data:message});

        dialogRef.afterOpened().subscribe(_ => {
          setTimeout(() => {
             dialogRef.close();
          }, timeout)
        })
  }

  // register(email:any,password:any){
  //   this.auth.register(email,password);
  // }

  

}
