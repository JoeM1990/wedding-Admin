import { Component, OnInit } from '@angular/core';
import { ItemQr } from 'src/app/utils/model/item-qr';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnInit {

  itemQr!:ItemQr;

  constructor() { }

  ngOnInit(): void {
  }

}
