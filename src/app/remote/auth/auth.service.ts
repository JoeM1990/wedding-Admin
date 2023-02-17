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
        const timeout=1200;

        let dialogRef=this.dialog.open(ErrorComponent,{data:'Nom d utilisateur où Mot de passe incorrect'});

        dialogRef.afterOpened().subscribe(_ => {
          setTimeout(() => {
             dialogRef.close();
          }, timeout)
        })

       //alert('Erreur de connexion');

        
        this.router.navigate(['/login']);
    } ) 

  }

  register(email: string, password: string){
    this.fireauth.createUserWithEmailAndPassword(email,password).then( () => {

      const timeout=1200;

      let dialogRef=this.dialog.open(SuccessComponent,{data:'Enregistrement effectué avec succes'});

        dialogRef.afterOpened().subscribe(_ => {
          setTimeout(() => {
             dialogRef.close();
          }, timeout)
        })


      //alert('Enregistrement effectue')
      this.router.navigate(['/login']);
    }, err => {
      //alert(err.message);

      const timeout=1200;

        let dialogRef=this.dialog.open(ErrorComponent,{data:'Echec d enregistrement'});

        dialogRef.afterOpened().subscribe(_ => {
          setTimeout(() => {
             dialogRef.close();
          }, timeout)
        })

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


}
