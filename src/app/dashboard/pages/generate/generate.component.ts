import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';
import * as htmlToImage from 'html-to-image';
import html2canvas from 'html2canvas';
import { CrudService } from 'src/app/utils/crud/crud.service';
import { FileUpload } from 'src/app/utils/model/file-upload';
import { Item } from 'src/app/utils/model/item';

@Component({
  selector: 'app-generate',
  templateUrl: './generate.component.html',
  styleUrls: ['./generate.component.css']
})
export class GenerateComponent implements OnInit {

  title1:any;
  title2:any;
  title3:any;
  title4:any;

  imgGet:any;

  photo:any;
  style:any;

  visible=true;
  visibleQr=false;
  

  @ViewChild('screen')
  screen!: ElementRef;
  @ViewChild('canvas')
  canvas!: ElementRef;
  @ViewChild('downloadLink')
  downloadLink!: ElementRef;

  @ViewChild('screenQr')
  screenQr!: ElementRef;
  @ViewChild('canvasQr')
  canvasQr!: ElementRef;
  @ViewChild('downloadLinkQr')
  downloadLinkQr!: ElementRef;

  elementType = NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;

  value:any;

  selectedFiles!: File;
  selectedQr!: File;
  selectedFilesT!: FileList;
  currentFileUpload!: FileUpload;
  item!: Item;

  public infosForm!: FormGroup;

  today = new Date();
  pipe = new DatePipe('en-US');

  ChangedFormat = this.pipe.transform(this.today, 'dd/MM/YYYY');
  changedDate = this.ChangedFormat;


  constructor(private crud:CrudService,public formBuilder: FormBuilder, public router:Router) {
    this.infosForm = this.formBuilder.group({
      name: this.title2,
      email_user: localStorage.getItem('email_user'),
      date:this.changedDate,
    })
   }

  ngOnInit(): void {
  
  }

  generateImage(){
    var node:any = document.getElementById('sectionImage');
    htmlToImage.toPng(node)
      .then(function (dataUrl) {
        var img = new Image();
        img.src = dataUrl;
        document.body.appendChild(img);
        
      })
      .catch(function (error) {
        console.error('Erreur', error);
      });
  }

  changeBack1(){   
    this.photo='../../../../assets/templates/img12.jpg';
    this.style='black';
  }

  changeBack2(){   
    this.photo='../../../../assets/templates/img2.jpg';
    this.style='black';
  }

  changeBack3(){   
    this.photo='../../../../assets/templates/img11.avif';
    this.style='black';
  }

  changeBack4(){   
    this.photo='../../../../assets/templates/img4.jpg';
    this.style='black';
  }

  changeBack5(){   
    this.photo='../../../../assets/templates/img5.webp';
    this.style='black';
  }

  changeBack6(){   
    this.photo='../../../../assets/templates/img6.jpg';
    this.style='black';
  }

  changeBack7(){   
    this.photo='../../../../assets/templates/img7.jpg';
    this.style='white';
  }

  changeBack8(){   
    this.photo='../../../../assets/templates/img13.avif';
    this.style='black';
  }

  changeBack9(){   
    this.photo='../../../../assets/templates/img9.webp';
  }

  changeBack10(){   
    this.photo='../../../../assets/templates/img10.jpg';
    this.style='black';
  }

  downloadImage(){

    html2canvas(this.screen.nativeElement).then(canvas => {
      this.canvas.nativeElement.src = canvas.toDataURL();
      this.downloadLink.nativeElement.href = canvas.toDataURL('image/png');
      this.downloadLink.nativeElement.download = this.title2+'.png';
      this.downloadLink.nativeElement.click();
      //this.selectedFiles=this.downloadLink.nativeElement.click();
      
      this.visible=false;

      canvas.toBlob( (blob:any) => {
        //let blobT = new Blob(blob, { type: "image/png" });
        const file = new File( [ blob ],  this.title2+'.png',{ type: "image/png" });
        const dT = new DataTransfer();
        dT.items.add( file );

        this.selectedFiles=file;

        localStorage.setItem('nomForm',this.title2);

        this.uploadInvitation();
        //this.value=localStorage.getItem('urlInvitation');

        


        

        //this.router.navigate(['/generate']);

    
      } );      
      //this.uploadInvitation();
    });

    

    
  }

  generateQr(){
    this.visibleQr=true;
    this.value=null;
    this.value=localStorage.getItem('urlInvitation');
    //this.downloadQr();
  }

  selectFile(event: any){
    this.selectedFilesT = event.target.files;
  }

  uploadInvitation(){
    //let file= this.selectedFiles.item(0);
    let file=this.selectedFiles;
    //this.selectedFiles = undefined;

    if(file){
      
      this.currentFileUpload = new FileUpload(file);
      this.crud.addInvitation(this.currentFileUpload,this.infosForm.value);


      //alert(localStorage.getItem('urlInvitation'));
      //this.value=localStorage.getItem('urlInvitation');

      

      //this.value=this.crud.urlGet;
      
      //alert('Effectuer avec success');
      
    }
    
  }

  uploadInvitationFrom(){
    let file= this.selectedFilesT.item(0);
    //let file=this.selectedFiles;
    //this.selectedFiles = undefined;

    if(file){
      
      this.currentFileUpload = new FileUpload(file);
      this.crud.addInvitation(this.currentFileUpload,this.infosForm.value);


      //alert(localStorage.getItem('urlInvitation'));
      //this.value=localStorage.getItem('urlInvitation');

      //this.value=this.crud.urlGet;
      
      //alert('Effectuer avec success');
      
    }
    
  }

  downloadQr(){

    html2canvas(this.screenQr.nativeElement).then(canvasQr => {
      this.canvasQr.nativeElement.src = canvasQr.toDataURL();
      this.downloadLinkQr.nativeElement.href = canvasQr.toDataURL('image/png');
      this.downloadLinkQr.nativeElement.downloadQr = this.title2+'Qr'+'.png';
      this.downloadLinkQr.nativeElement.click();
      this.selectedFiles=this.downloadLink.nativeElement.click();
      
      this.visibleQr=true;

      canvasQr.toBlob( (blob:any) => {
        //let blobT = new Blob(blob, { type: "image/png" });
        const file = new File( [ blob ],  this.title2+'Qr'+'.png',{ type: "image/png" });
        const dT = new DataTransfer();
        dT.items.add( file );

        this.selectedQr=file;

        localStorage.setItem('nomForm',this.title2);

        this.uploadQr();
        //this.value=localStorage.getItem('urlInvitation');


        //this.router.navigate(['/generate']);
        
      } );

      
      
      //this.uploadInvitation();
    });

    
  }

  uploadQr(){
    //let file= this.selectedFiles.item(0);
    let file=this.selectedQr;
    //this.selectedFiles = undefined;

    if(file){
      
      this.currentFileUpload = new FileUpload(file);
      this.crud.addQrCode(this.currentFileUpload,this.infosForm.value);


      //alert(localStorage.getItem('urlInvitation'));
      //this.value=localStorage.getItem('urlInvitation');

      //this.value=this.crud.urlGet;
      
      //alert('Effectuer avec success');
      
    }
    
  }



}
