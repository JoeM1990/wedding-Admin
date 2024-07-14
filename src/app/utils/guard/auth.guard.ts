import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { ErrorComponent } from 'src/app/dialog/error/error.component';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(public auth:AuthService, public router:Router, public dialog:MatDialog){}

  canActivate(){
    if(this.auth.checkLogin()){
      return true;
    }
      this.router.navigate(['/login']);
      this.dialogError("Veuillez d'abord vous connecter");
    
    return false;
    
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
