import { ConstantPool } from '@angular/compiler';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { json } from 'express';
import { CookieOptions, CookieService } from 'ngx-cookie-service';
import { ErrorComponent } from '../dialog/error/error.component';
import { SuccessComponent } from '../dialog/success/success.component';
import { AuthService } from '../utils/auth/auth.service';
import  *  as CryptoJS from  'crypto-js';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  registerForm:FormGroup;
  password:any;

  //email:any

  show = false;

  constructor(public auth:AuthService, public router:Router, public formBuilder:FormBuilder
    , public dialog:MatDialog, private cookieService: CookieService) {
    this.registerForm=this.formBuilder.group(
      {
      username: ['',[Validators.required]],
      email: ['',[Validators.required,Validators.pattern("[^ @]*@[^ @]*"),]],
      password: ['',[Validators.required,Validators.maxLength(6)]],
      role: 'Client',
      isApproved: 'Activer'
      }
    )
   }

  ngOnInit(): void {
    
  }

  login(email:any,password:any){
    this.auth.login(email,password);
  }

  loginApi(email:any,password:any){
    if(!email && !password){
      this.dialogError('Veuillez remplir le formulaire');
    }else{
      this.auth.loginApi(email,password)
    .subscribe(
      response => {
       // alert(response['message'])
        let token=response['token'];
        let role=response['role'];
        //let data=response['data'];

        this.dialogSuccess('Bienvenue')

        //this.getData('Papa');
        if(token){

          
          this.cookieService.set('token',token,{secure:true});
          this.cookieService.set('role',this.encryptRole(role),{secure:true})
          //localStorage.setItem('token',token);
          localStorage.setItem('email_user',email);

          //localStorage.setItem('Papa', this.encryptRole(role));
          //localStorage.setItem('role',role);
          this.router.navigate(['/dashboard']);
        }

        
      },
      error => {
        this.dialogError(error['error']);
        this.router.navigate(['/login']);
        ///alert(error);
        //console.log(error);
      });
    }
    
  }

  registerUser(){
    if(this.registerForm.valid){
      this.auth.registerApi(this.registerForm.value)
    .subscribe(
      response => {
        this.dialogSuccess('Enregistrement effectué avec success');
        this.registerForm.reset();
        this.router.navigate(['/login']);
      },
      error => {
        this.dialogError(error['error']);
        this.registerForm.reset();
        //alert("Echec d'enregistrement");
        //console.log(error)
      });
    }else{
      this.dialogError("Le formulaire est vide ou mal rempli");
    }
    
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

  dialogSuccess(message:any){
    const timeout=1400;

      let dialogRef=this.dialog.open(SuccessComponent,{data:message});

        dialogRef.afterOpened().subscribe(_ => {
          setTimeout(() => {
             dialogRef.close();
          }, timeout)
        })
  }

  // register(email:any,password:any){
  //   this.auth.register(email,password);
  // }

  onClick() {
    if (this.password === 'password') {
      this.password = 'text';
      this.show = true;
    } else {
      this.password = 'password';
      this.show = false;
    }
  }

  private encryptRole(txt: string): string {
    return CryptoJS.AES.encrypt(txt, 'Role').toString();
  }

  private decryptRole(txtToDecrypt: string) {
    return CryptoJS.AES.decrypt(txtToDecrypt, 'Role').toString(CryptoJS.enc.Utf8);
  }

  public getData(key: string) {
    let data = localStorage.getItem(key)|| "";
    return this.decryptRole(data);
  }


  
  

}
