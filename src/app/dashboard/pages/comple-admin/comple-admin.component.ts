import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/utils/auth/auth.service';
import { User } from 'src/app/utils/model/user';

@Component({
  selector: 'app-comple-admin',
  templateUrl: './comple-admin.component.html',
  styleUrls: ['./comple-admin.component.css']
})
export class CompleAdminComponent implements OnInit {

  user:any;
  elseBlock:any
  thenBlock:any

 

  constructor(public auth:AuthService) { }

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

}
