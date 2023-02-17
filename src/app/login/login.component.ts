import { Component, OnInit } from '@angular/core';
import { AuthService } from '../remote/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth:AuthService) { }

  ngOnInit(): void {
  }

  login(email:any,password:any){
    this.auth.login(email,password);
  }

  register(email:any,password:any){
    this.auth.register(email,password);
  }

}
