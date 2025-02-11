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
import { CrudService } from '../utils/crud/crud.service';
import { ValidationComponent } from '../dialog/validation/validation.component';
import { RecoveryPasswordComponent } from '../dialog/recovery-password/recovery-password.component';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  registerForm:FormGroup;
  password:any;

  progressBar=false;

  //email:any

  show = false;

  emailUser:any;
  passwordUser:any

  constructor(public auth:AuthService, public router:Router, public formBuilder:FormBuilder
    , public dialog:MatDialog, private cookieService: CookieService, public crud:CrudService) {
    this.registerForm=this.formBuilder.group(
      {
      username: ['',[Validators.required, Validators.pattern("[a-zA-Z ]*")]],
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
      this.progressBar=true;

      this.auth.loginApi(email,password)
    .subscribe(
      response => {
        
       // alert(response['message'])
        let token=response['token'];
        let role=response['role'];
        //let data=response['data'];

        this.dialogSuccess('Bienvenue')

        if(token){
          
          this.cookieService.set('token',token,{secure:true});
          this.cookieService.set('xxxx-0000',this.encryptRole(role),{secure:true})
          //localStorage.setItem('token',token);
          localStorage.setItem('yyyy-0000',this.encryptEmail(email));

          //localStorage.setItem('Papa', this.encryptRole(role));
          //localStorage.setItem('role',role);
          this.router.navigate(['/dashboard']);
        }


        // setTimeout(()=>{
        //   this.progressBar=false;
        // },3500);

        this.progressBar=false;
        
        
      },
      error => {
       this.progressBar=false;
       
        this.dialogError(error['error']);
        this.router.navigate(['/login']);
        ///alert(error);
        console.log(error);
      });
    }
    
  }

  registerUser(){
    if(this.registerForm.valid){
      this.progressBar=true;

      let code= localStorage.getItem('otpCode');

      this.auth.registerApi(this.registerForm.value,code)
    .subscribe(
      response => {

        // setTimeout(()=>{
        //   this.progressBar=false;
        // },1500);

        this.progressBar=false;

        this.dialogSuccess('Enregistrement effectué avec success');
        //this.registerForm.reset();
        this.router.navigate(['/login']);

        window.location.reload();

        
      },
      error => {
        this.progressBar=false;
        this.dialogError(error['error']);
        this.router.navigate(['/login']);
        window.location.reload();
        //this.registerForm.reset();
        //alert("Echec d'enregistrement");
        console.log(error)
      });


      this.crud.addUserPaiement(this.registerForm.controls['email'].value,"FREE")
      .subscribe(res=>{

      });

    }else{
      this.progressBar=false;
      this.dialogError("Le formulaire est vide ou mal rempli");
    }
    
  }

  recoveryPasswordUser(){
   
      //this.progressBar=true;

      let code = localStorage.getItem('otpCodeRecovery');
      let password = localStorage.getItem('passwordRecovery');
      

      this.auth.recoveryPasswordApi(this.emailUser,password,code)
    .subscribe(
      response => {

        // setTimeout(()=>{
        //   this.progressBar=false;
        // },1500);

        this.progressBar=false;

        localStorage.removeItem('otpCodeRecovery');
        localStorage.removeItem('passwordRecovery');

        this.dialogSuccess('Recuperation mot de passe effectué avec success');
        //this.registerForm.reset();
        this.router.navigate(['/login']);

        window.location.reload();

        
      },
      error => {
        this.progressBar=false;
        this.dialogError(error['error']);
        //console.log(error);
        this.router.navigate(['/login']);
        //window.location.reload();
        //this.registerForm.reset();
        //alert("Echec d'enregistrement");
        //console.log(error)
      });
    
  }


  verificationMailUser(){
    if(this.registerForm.valid){
      this.progressBar=true;

      this.auth.verificationApi(this.registerForm.value)
    .subscribe(
      response => {

        this.progressBar=false;

        // setTimeout(()=>{
        //   this.progressBar=false;
        // },1500);

        let refDialog=this.dialog.open(ValidationComponent,{data:"Veuillez introduire le code de validation \n envoyé a \n"+this.registerForm.controls['email'].value});


        refDialog.afterClosed().subscribe(res=>{
          if(res == 'true'){
            this.registerUser()
            localStorage.removeItem('otpCode');
          }else if(res == 'false'){
            window.location.reload();
          }
        });
        
      },
      error => {
        console.log(error);
        this.progressBar=false;
        this.dialogError('Erreur du serveur');
      
      });

    }else{
      this.progressBar=false;
      this.dialogError("Le formulaire est vide ou mal rempli");
    }
    
  }

  verificationMailUserRecovery(){
    if(!this.emailUser){
      
      this.progressBar=false;
      this.dialogError("Veuillez introduire votre adresse email");

    }else{
      this.progressBar=true;

      this.auth.verificationApiRecovery(this.emailUser)
    .subscribe(
      response => {

        this.progressBar=false;

        this.dialogRecovery("Veuillez introduire le code de validation \n envoyé a \n"+this.emailUser);

        
      },
      error => {
        this.progressBar=false;
        this.dialogError('Erreur du serveur');
        window.location.reload();
        
      });
    }
    
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
    const timeout=1400;

      let dialogRef=this.dialog.open(SuccessComponent,{data:message});

        dialogRef.afterOpened().subscribe(_ => {
          setTimeout(() => {
             dialogRef.close();
          }, timeout)
        })
  }

  dialogValidation(message:any){
    let refDialog=this.dialog.open(ValidationComponent,{data:''});


    refDialog.afterClosed().subscribe(res=>{
      if(res == 'true'){
        this.registerUser()
      }
    });
  }

  dialogRecovery(message:any){


      let refDialog=this.dialog.open(RecoveryPasswordComponent,{data:message});


    refDialog.afterClosed().subscribe(res=>{
      if(res == 'true'){
       this.recoveryPasswordUser();
      }
    });

         
  }

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
    return CryptoJS.AES.encrypt(txt, 'role').toString();
  }

  private encryptRoleKey(txt: string): string {
    return CryptoJS.AES.encrypt(txt, 'role').toString();
  }

  private decryptRole(txtToDecrypt: string) {
    return CryptoJS.AES.decrypt(txtToDecrypt, 'role').toString(CryptoJS.enc.Utf8);
  }

  public getData(key: string) {
    let data = localStorage.getItem(key)|| "";
    return this.decryptRole(data);
  }

  private encryptEmail(txt: string): string {
    return CryptoJS.AES.encrypt(txt, 'email_user').toString();
  }

  private encryptEmailKey(txt: string): string {
    return CryptoJS.AES.encrypt(txt, 'email_user').toString();
  }

  sendWhatsapp(){
  
    window.open('https://api.whatsapp.com/send?phone=243816717846'+
    "&text=Bonjour, je suis utilisateur de l'application WeddingApp \n j'ai oublié le mot de passe", "popup");  
  }

  

 

  


  
  

}
