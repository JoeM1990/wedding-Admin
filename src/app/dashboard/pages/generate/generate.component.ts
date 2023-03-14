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
  title6:any;

  imgGet:any;

  photo:any;
  style:any;

  visible=true;
  visibleQr=false;
  visibleT=false;

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

  value!:string;

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
  valueT: string | undefined;

  image64Get:any;


  constructor(private crud:CrudService,public formBuilder: FormBuilder, public router:Router) {
    this.infosForm = this.formBuilder.group({
      //name: this.title2,
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
    this.photo='../../../../assets/templates/c1.jpg';
    this.style='black';
  }

  changeBack2(){   
    this.photo='../../../../assets/templates/img2.jpg';
    this.style='black';
  }

  changeBack3(){   
    this.photo='../../../../assets/templates/c2.jpg';
    this.style='black';
  }

  changeBack4(){   
    this.photo='../../../../assets/templates/c3.jpg';
    this.style='black';
  }

  changeBack5(){   
    this.photo='../../../../assets/templates/c4.jpg';
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
    
      this.visible=false;

      canvas.toBlob( (blob:any) => {
       
        const file = new File( [ blob ],  this.title2+'.png',{ type: "image/png" });
        const dT = new DataTransfer();
        dT.items.add( file );

        this.selectedFiles=file;

        

       //window.location.reload();
        
      } );      
     
    });
    //this.uploadInvitation();
  }

  generateQr(){
    this.value=''+localStorage.getItem('urlInvitation');
    //this.value=localStorage.getItem('urlInvitation')?.toString();
    this.visibleQr=true;
  }

  selectFile(event: any){
    this.selectedFilesT = event.target.files;
  }

  uploadInvitation(){

    localStorage.setItem('nomForm',this.title2);
   
    let file=this.selectedFiles;
  
    if(file){
      
      this.currentFileUpload = new FileUpload(file);
      this.crud.addInvitation(this.currentFileUpload,this.infosForm.value);

      window.location.reload()

    }
    
  }

  uploadInvitationApi(){
   
    let file=this.selectedFiles;
  
    if(file){
      
      let email=localStorage.getItem('email_user');

      this.crud.addInvitationApi(file,email,'invitation')
      .subscribe(
        response =>{
          if(response){
            window.location.reload();
          }
          
        },
        error =>{
          alert(error['message']);
        }
      );

    }
    
  }

  uploadInvitationFrom(){
    
    this.getBase64();

    let file= this.selectedFilesT.item(0);

    if(file){
      
      this.currentFileUpload = new FileUpload(file);
      this.crud.addInvitation(this.currentFileUpload,this.infosForm.value);
      //this.uploadInvitation();

      // let email=localStorage.getItem('email_user');

      // this.crud.addInvitationApi(file,email,'invitation')
      // .subscribe(
      //   response =>{
      //     if(response){
      //       //alert(response['message'])
      //       //window.location.reload();
      //     }
          
      //   },
      //   error =>{
      //     alert(error['message']);
      //   }
      // );
      
      
    }
    
  }

  downloadQr(){

    html2canvas(this.screenQr.nativeElement).then(canvasQr => {
      this.canvasQr.nativeElement.src = canvasQr.toDataURL();
      this.downloadLinkQr.nativeElement.href = canvasQr.toDataURL('image/png');
      this.downloadLinkQr.nativeElement.download = this.title2+'Qr'+'.png';
      this.downloadLinkQr.nativeElement.click();
      this.selectedFiles=this.downloadLink.nativeElement.click();

      canvasQr.toBlob( (blob:any) => {
       
        const file = new File( [ blob ],  this.title2+'Qr'+'.png',{ type: "image/png" });
        const dT = new DataTransfer();
        dT.items.add( file );

        this.selectedQr=file;

        localStorage.setItem('nomForm',this.title2);

        this.uploadQr();
       
      } );

      
    });

    
  }

  uploadQr(){
  
    let file=this.selectedQr;

    if(file){
      
      this.currentFileUpload = new FileUpload(file);
      this.crud.addQrCode(this.currentFileUpload,this.infosForm.value);

    }
    
  }

    getBase64() {
    let me = this;
    //let file = event.target.files[0];
    let file=this.selectedFilesT[0];
    let reader = new FileReader();
    
    reader.readAsDataURL(file);
    reader.onload = function () {
      //me.modelvalue = reader.result;
      //console.log(reader.result);
      //return 
      
      //imgData=reader.result.;
    };

    this.image64Get=reader.result?.toString();
    console.log(this.image64Get)
    
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
 }



}
