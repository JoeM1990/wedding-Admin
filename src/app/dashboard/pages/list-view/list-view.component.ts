import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';
import * as htmlToImage from 'html-to-image';
import html2canvas from 'html2canvas';
import { Observable } from 'rxjs';
import { CrudService } from 'src/app/utils/crud/crud.service';
import { Item } from 'src/app/utils/model/item';
import { ItemQr } from 'src/app/utils/model/item-qr';

import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';
import { ConfirmationComponent } from 'src/app/dialog/confirmation/confirmation.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/utils/auth/auth.service';
import { CookieService } from 'ngx-cookie-service';
import  *  as CryptoJS from  'crypto-js';


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

  dataUser:any;
  dataAdmin:any;
  dataId:any;

  @ViewChild('screenGet')
  screenGet!: ElementRef;
  @ViewChild('canvasGet')
  canvasGet!: ElementRef;
  @ViewChild('downloadLinkGet')
  downloadLinkGet!: ElementRef;

  title2:any;

  visibleListe=false;
  visibleMessage=false;

  visibleAdmin=false;
  visibleUser=false;

  phonePartage:any;

  urlData:any;

  checkingRole=true;
  checkingRole2=false;

  nameGetId:any;
  descriptionGetId:any;
  idGetId:any;

  constructor(public crud:CrudService, public httpClient:HttpClient, public dialog:MatDialog,
    public auth:AuthService, private cookieService: CookieService) { }

  ngOnInit(): void {

    this.checkRole();

    let email=this.getDataEmail('yyyy-0000');
    

    this.crud.getAllUplaodApi()
    .subscribe(response=>{
      this.dataAdmin=response;
    })

    this.crud.getAllUplaodByEmailApi(email)
    .subscribe(response=>{
      this.dataUser=response;
    })

    this.crud.getAllItem().subscribe(res => {

      this.ItemQr = res.map( e => {
        return{
          id: e.payload.doc.id,
          ...e.payload.doc.data() as {}
        } as unknown as ItemQr;
      })

      if(res.length>0){
        this.visibleListe=true;
        //this.visibleMessage=false;
      }else{
        //this.visibleMessage=true;
        this.visibleListe=false;
      }

     })

      
      
      
  }

  deleteItem(Item: { id: string | undefined; },url:any){

    let refDialog=this.dialog.open(ConfirmationComponent,{data:'Voulez-vous supprimer cette invitation ?'});


    refDialog.afterClosed().subscribe(res=>{
      if(res == 'true'){
        this.crud.deleteItem(Item);
        this.crud.deleteFile(url);
      }
    })

    
  }

  deleteFileItem(id:any,name:any){

    let refDialog=this.dialog.open(ConfirmationComponent,{data:'Voulez-vous supprimer cette invitation ?'});


    refDialog.afterClosed().subscribe(res=>{
      if(res == 'true'){
        //this.crud.deleteItem(Item);
        //this.crud.deleteFile(url);
        this.crud.deleteFileByName(name).subscribe(res=>{
          
        });

        this.crud.deleteUploadById(id).subscribe(res=>{
          
        });
        
      }
    })

    
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

  getUploadById(id:any){
    this.crud.getUplaodByIdApi(id)
    .subscribe(response=>{
      this.dataId=response;

      this.nameGetId=response['name'];
      this.descriptionGetId=response['description'];
      this.idGetId=response['id'];

      console.log(response['description']);
    })
  }

  sendWhatsapp(phoneNumber:any){
    //const url='https://api.whatsapp.com/send?text=';
    //let urlData=localStorage.getItem('urlToSend')?.toString;

    this.urlData=localStorage.getItem('urlToSend');
    const image=encodeURIComponent(this.urlData);

    window.open('https://api.whatsapp.com/send?phone='+phoneNumber+'&text='+image, "popup");

    //this.httpClient.post('https://api.whatsapp.com/send?phone='+phoneNumber+'&text='+image,'')
    
    
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
    
		const link = document.createElement('a');
    //link.setAttribute('target', '_blank');
    link.setAttribute('href', url);
    link.setAttribute('download', nameOk);
    document.body.appendChild(link);
    link.click();
    link.remove();

    // const xhr = new XMLHttpRequest();
    // xhr.responseType = 'blob';
    // xhr.onload = (event) => {
    //   const blob = xhr.response;
    // };
    // xhr.open('GET', url);
    // xhr.send();
  }

  download(url:any,name:any) {
   
    this.httpClient.get(url, {
      headers: {
        "Accept": "application/pdf"
      },
      responseType: "blob"
    }).subscribe(
      (x: any) => {
        
        var newBlob = new Blob([x], { type: "image/png" });

        const data = window.URL.createObjectURL(newBlob);

        var link = document.createElement("a");
        link.href = data;
        link.download = name+".png";
     
        link.dispatchEvent(
          new MouseEvent("click", {
            bubbles: true,
            cancelable: true,
            view: window
          })
        );

        setTimeout(function() {
         
          window.URL.revokeObjectURL(data);
          link.remove();
        }, 100);
      },
      err => {
        console.log("ERR", err);
      }
    );
  }

  downloadImage(name:any){

    var node:any = document.getElementById('imgDown');


    htmlToImage.toJpeg(node)
      .then(function (dataUrl) {
    var link = document.createElement('a');
    link.download = name+".jpeg";

    link.href = dataUrl;
    link.click();
  });
  }

  sendToWhatsapp(url:any){

  }

  saveData(url:any) {
    //localStorage.removeItem('urlToSend');
    localStorage.setItem('urlToSend',url);
  }

  onConfirmation(){
    
    let refDialog=this.dialog.open(ConfirmationComponent,{data:'Voulez-vous vous Deconnecter ?'});


    refDialog.afterClosed().subscribe(res=>{
      if(res == 'true'){
        this.auth.logoutApi();
      }
    })
  }

  checkRole(){

    let roleKey=this.decryptRoleKey('role');
    let roleCheck=this.getData('xxxx-0000');

    if(roleCheck=='Client'){
      this.checkingRole=false;
      this.visibleUser=true;
      this.visibleAdmin=false;
    }else if(roleCheck=='Admin'){
      this.checkingRole2=true;
      this.visibleAdmin=true;
      this.visibleUser=false;
    }
  }

  private decryptRole(txtToDecrypt: string) {
    return CryptoJS.AES.decrypt(txtToDecrypt, 'role').toString(CryptoJS.enc.Utf8);
  }

  public getData(key: string) {
    let data = this.cookieService.get(key)|| "";
    return this.decryptRole(data);
  }

  private decryptRoleKey(txtToDecrypt: string) {
    return CryptoJS.AES.decrypt(txtToDecrypt, 'role').toString(CryptoJS.enc.Utf8);
  }
  
  public getDataKey(key: string) {
    let data = this.cookieService.get(key)|| "";
    return this.decryptRoleKey(data);
  }


  private decryptEmail(txtToDecrypt: string) {
    return CryptoJS.AES.decrypt(txtToDecrypt, 'email_user').toString(CryptoJS.enc.Utf8);
  }
    
  public getDataEmail(key: string) {
    let data = localStorage.getItem(key)|| "";
    return this.decryptEmail(data);
  }


}
