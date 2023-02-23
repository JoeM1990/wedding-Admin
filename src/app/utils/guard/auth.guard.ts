import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(public auth:AuthService, public router:Router){}

  canActivate(){
    if(this.auth.checkLogin()){
      return true;
    }
      this.router.navigate(['/login']);
      alert("Veuillez d'abord vous connecter");
    return false;
    
  }
  
}
