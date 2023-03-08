import { Component, OnInit } from '@angular/core';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';
import { CrudService } from 'src/app/utils/crud/crud.service';
import { Item } from 'src/app/utils/model/item';
import { ItemQr } from 'src/app/utils/model/item-qr';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnInit {

  ItemQr!:Item[];

  Item2!:Item[];

  elementType = NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;

  constructor(public crud:CrudService) { }

  ngOnInit(): void {
    this.crud.getAllItem().subscribe(res => {
      
      this.ItemQr = res.map( e => {
        return{
          id: e.payload.doc.id,
          ...e.payload.doc.data() as {}
        } as unknown as ItemQr;
      })
     })
  }

  deleteItem(Item: { id: string | undefined; }){
    if(confirm("Voulez vous supprimer cette invitation")){
      this.crud.deleteItem(Item)
    }
  }

  getItemByDesc(desc:any){
    this.crud.getItemByDesc(desc).then( res=>{
  
      console.log(res.size);
  
      this.Item2=res.docs.map( e => {
        return{
          id: e.id,
          ...e.data() as {}
        }as Item;
      })
      
        })
        .catch(err =>{
          console.log(err)
          
        })
  }

}
