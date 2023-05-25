import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/utils/crud/crud.service';

@Component({
  selector: 'app-home-pub',
  templateUrl: './home-pub.component.html',
  styleUrls: ['./home-pub.component.css']
})
export class HomePubComponent implements OnInit {

  

  constructor(public crud:CrudService) { }

  ngOnInit(): void {
    
  }

  sendMail(){
    
  }

}
