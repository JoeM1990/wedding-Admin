import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { ErrorComponent } from 'src/app/dialog/error/error.component';
import { SuccessComponent } from 'src/app/dialog/success/success.component';
import { User } from '../model/user';

const baseUrl = 'http://localhost:8080/api/';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public fireauth : AngularFireAuth, public router: Router,public dialog:MatDialog
    , public httpClient:HttpClient, private cookieService: CookieService) { }

  login(email : string, password : string){
    this.fireauth.signInWithEmailAndPassword(email,password).then( () =>{
        localStorage.setItem('token','true');
        localStorage.setItem('email_user',email);
        this.router.navigate(['/dashboard']);
        return true;
    }, err => {
        this.dialogError('Username ou password incorrect')
      
        this.router.navigate(['/login']);
    } ) 

  }

  loginApi(email : string, password : string):Observable<any> {
    return this.httpClient.post(baseUrl+'login',{email: email, password: password});
  }

  logoutApi(){
    //localStorage.removeItem('token');
    this.cookieService.deleteAll();
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  registerApi(user:User, code:any){
    //let token=localStorage.getItem('token');

    let token=this.cookieService.get('token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })

    const requestOptions = { headers: headers };

    return this.httpClient.post(baseUrl+'users/'+code,user,requestOptions);
  }

  verificationApi(user:User){
    //let token=localStorage.getItem('token');

    let token=this.cookieService.get('token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })

    const requestOptions = { headers: headers };

    return this.httpClient.post(baseUrl+'validationMail',user,requestOptions);
  }

  verificationApiRecovery(email:any){
    //let token=localStorage.getItem('token');

    let token=this.cookieService.get('token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })

    const requestOptions = { headers: headers };

    return this.httpClient.post(baseUrl+'validationMailRecovery/'+email,requestOptions);
  }

  recoveryPasswordApi(email:any,password:any,code:any){
    //let token=localStorage.getItem('token');

    let token=this.cookieService.get('token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })

    const requestOptions = { headers: headers };

    return this.httpClient.post(baseUrl+'/passwordRecovery/'+email+'/'+password+'/'+code,requestOptions);
  }


  

  // register(email: string, password: string){
  //   this.fireauth.createUserWithEmailAndPassword(email,password).then( () => {
  //     this.dialogSuccess('Enregistrement effectué avec succes')
  //     //alert('Enregistrement effectue')
  //     this.router.navigate(['/login']);
  //   }, err => {
  //     //alert(err.message);
  //     this.dialogError('Echec d enregistrement');
  //     this.router.navigate(['/login']);
  //   }

  //   )

   
  // }

  // logout(){
  //   this.fireauth.signOut().then( () => {
  //     localStorage.removeItem('token');
  //     this.router.navigate(['/login']);
  //   }, err  => {
  //     alert(err.message);
  //   })
  // }

  checkLogin(){
    return !! this.cookieService.get('token');

  }

  dialogSuccess(message:any){
    const timeout=1200;

      let dialogRef=this.dialog.open(SuccessComponent,{data:message});

        dialogRef.afterOpened().subscribe(_ => {
          setTimeout(() => {
             dialogRef.close();
          }, timeout)
        })
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

  


}
