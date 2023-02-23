import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/utils/auth/auth.service';

@Component({
  selector: 'app-comple-admin',
  templateUrl: './comple-admin.component.html',
  styleUrls: ['./comple-admin.component.css']
})
export class CompleAdminComponent implements OnInit {

  constructor(public auth:AuthService) { }

  ngOnInit(): void {
  }

}
