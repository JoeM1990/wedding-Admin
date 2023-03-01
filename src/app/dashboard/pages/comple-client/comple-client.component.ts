import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/utils/auth/auth.service';

@Component({
  selector: 'app-comple-client',
  templateUrl: './comple-client.component.html',
  styleUrls: ['./comple-client.component.css']
})
export class CompleClientComponent implements OnInit {

  user:any;
  clientForm:FormGroup;

  constructor(public auth:AuthService, public formBuilder:FormBuilder) {
    this.clientForm = this.formBuilder.group({
      username: [''],
      email: [''],
      password: [''],
      role: [''],
      isApproved: true
    })
   }

  ngOnInit(): void {
    this.auth.getAllUserApi()
    .subscribe(
      response => {
        this.user=response;
      },
      error => {
        console.log(error)
      });
  }

  addUser(){
    this.crud.addUser(this.clientForm.value)
    .subscribe(
      response =>{
        this.router.navigate(['/compte-client']);
      },
      error =>{
        alert(error['message']);
      }
    );
    
  }

}
