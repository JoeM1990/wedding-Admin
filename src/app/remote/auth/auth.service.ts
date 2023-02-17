import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public fireauth : AngularFireAuth, public router: Router) { }

  login(email : string, password : string){
    this.fireauth.signInWithEmailAndPassword(email,password).then( () =>{
        localStorage.setItem('token','true');
        this.router.navigate(['/dashboard']);
        return true;
    }, err => {
        const timeout=1200;

        // let dialogRef=this.dialog.open(ErrorComponent,{data:'Nom d utilisateur ou mot de passe incorrect'});

        // dialogRef.afterOpened().subscribe(_ => {
        //   setTimeout(() => {
        //      dialogRef.close();
        //   }, timeout)
        // })

        //alert('Erreur de connexion');

        
        this.router.navigate(['/login']);
    } ) 

  }

  register(email: string, password: string){
    this.fireauth.createUserWithEmailAndPassword(email,password).then( () => {
      alert('Enregistrement effectue')
      this.router.navigate(['/login']);
    }, err => {
      alert(err.message);
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
