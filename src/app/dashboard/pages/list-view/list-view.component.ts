import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/utils/crud/crud.service';
import { Item } from 'src/app/utils/model/item';
import { ItemQr } from 'src/app/utils/model/item-qr';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnInit {

  ItemQr!:ItemQr[];

  constructor(public crud:CrudService) { }

  ngOnInit(): void {
    // this.crud.getAllQr().subscribe(res => {
      
    //   this.ItemQr = res.map( e => {
    //     return{
    //       id: e.payload.doc.id,
    //       ...e.payload.doc.data() as {}
    //     } as unknown as ItemQr;
    //   })
    //  })
  }

}
