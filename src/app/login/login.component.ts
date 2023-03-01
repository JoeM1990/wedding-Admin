import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../utils/auth/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  registerForm:FormGroup;

  constructor(public auth:AuthService, public router:Router, public formBuilder:FormBuilder) {
    this.registerForm=this.formBuilder.group(
      {
      username: [''],
      email: [''],
      password: [''],
      role: 'Client',
      isApproved: true
      }
    )
   }

  ngOnInit(): void {
  }

  // login(email:any,password:any){
  //   this.auth.login(email,password);
  // }

  loginApi(email:any,password:any){
    this.auth.loginApi(email,password)
    .subscribe(
      response => {
        alert(response['message'])
        let token=response['token'];
        let data=response['data'];

        if(data != null){
          this.router.navigate(['/dashboard']);
        }else{
          this.router.navigate(['/login']);
        }
        localStorage.setItem('token',token);
        localStorage.setItem('email_user',email);
      },
      error => {
        this.router.navigate(['/login']);
        alert(error['message']);
        console.log(error);
      });
  }

  registerUser(){

  }

  // register(email:any,password:any){
  //   this.auth.register(email,password);
  // }

  

}
