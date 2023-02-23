import { Component, OnInit } from '@angular/core';
import { AuthService } from '../utils/auth/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public auth:AuthService) { }

  ngOnInit(): void {
  }

  login(email:any,password:any){
    this.auth.login(email,password);
  }

  loginApi(email:any,password:any){
    this.auth.loginApi(email,password)
    .subscribe(
      response => {
        let token=response['token'];
        let data=response['data'];
        //console.log(token);
      },
      error => {
        console.log(error);
      });
  }

  register(email:any,password:any){
    this.auth.register(email,password);
  }

  

}
