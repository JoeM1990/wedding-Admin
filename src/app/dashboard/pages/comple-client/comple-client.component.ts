import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/utils/auth/auth.service';

@Component({
  selector: 'app-comple-client',
  templateUrl: './comple-client.component.html',
  styleUrls: ['./comple-client.component.css']
})
export class CompleClientComponent implements OnInit {

  user:any;

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
