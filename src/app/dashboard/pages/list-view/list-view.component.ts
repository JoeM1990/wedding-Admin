import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';
import * as htmlToImage from 'html-to-image';
import html2canvas from 'html2canvas';
import { Observable } from 'rxjs';
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

  visible=false;

  @ViewChild('screenGet')
  screenGet!: ElementRef;
  @ViewChild('canvasGet')
  canvasGet!: ElementRef;
  @ViewChild('downloadLinkGet')
  downloadLinkGet!: ElementRef;

  title2:any;

  constructor(public crud:CrudService, public httpClient:HttpClient) { }

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

        this.Item2.forEach(e=>{
          this.title2=e.name;
        })
  }

  sendWhatsapp(urlData:any){
    const url='https://whatsapp://send?text=';
    const image=encodeURIComponent(urlData);
    this.httpClient.post(url,image);
  }

  downloadQr(){

    html2canvas(this.screenGet.nativeElement).then(canvasGet => {
      this.canvasGet.nativeElement.src = canvasGet.toDataURL();
      this.downloadLinkGet.nativeElement.href = canvasGet.toDataURL('image/png');
      this.downloadLinkGet.nativeElement.download = this.title2+'.png';
      this.downloadLinkGet.nativeElement.click();
    
      this.visible=true;

      // canvas.toBlob( (blob:any) => {
       
      //   const file = new File( [ blob ],  this.title2+'.png',{ type: "image/png" });
      //   const dT = new DataTransfer();
      //   dT.items.add( file );

      // } );      
     
    });
   
  }

 

   downloadFile(url:any,name:any): any {

    let urlOk="'"+url+"'";
    let nameOk=name+".png";
    //console.log(url);

    console.log(nameOk)
    console.log(urlOk)
    
		// const link = document.createElement('a');
    // link.setAttribute('target', '_blank');
    // link.setAttribute('href', urlOk);
    // link.setAttribute('download', nameOk);
    // document.body.appendChild(link);
    // link.click();
    // link.remove();

    // const xhr = new XMLHttpRequest();
    // xhr.responseType = 'blob';
    // xhr.onload = (event) => {
    //   const blob = xhr.response;
    // };
    // xhr.open('GET', url);
    // xhr.send();
  }

}
