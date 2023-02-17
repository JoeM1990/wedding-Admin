import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ErrorComponent } from 'src/app/dialog/error/error.component';
import { SuccessComponent } from 'src/app/dialog/success/success.component';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public fireauth : AngularFireAuth, public router: Router,public dialog:MatDialog) { }

  login(email : string, password : string){
    this.fireauth.signInWithEmailAndPassword(email,password).then( () =>{
        localStorage.setItem('token','true');
        this.router.navigate(['/dashboard']);
        return true;
    }, err => {
        this.dialogError('Username ou password incorrect');
      
        this.router.navigate(['/login']);
    } ) 

  }

  register(email: string, password: string){
    this.fireauth.createUserWithEmailAndPassword(email,password).then( () => {
      this.dialogSuccess('Enregistrement effectué avec succes');
      //alert('Enregistrement effectue')
      this.router.navigate(['/login']);
    }, err => {
      //alert(err.message);
      this.dialogError('Echec d enregistrement');
      this.router.navigate(['/login']);
    }

    )

   
  }

  logout(){
    this.fireauth.signOut().then( () => {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }, err  => {
      alert(err.message);
    })
  }

  checkLogin(){
    return !! localStorage.getItem('token');
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
