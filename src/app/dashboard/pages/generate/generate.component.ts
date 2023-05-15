import { DatePipe } from '@angular/common';
import { Component, ElementRef, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';
import * as e from 'express';
import * as htmlToImage from 'html-to-image';
import html2canvas from 'html2canvas';
import { CookieService } from 'ngx-cookie-service';
import { AppModule } from 'src/app/app.module';
import { ConfirmationComponent } from 'src/app/dialog/confirmation/confirmation.component';
import { SuccessComponent } from 'src/app/dialog/success/success.component';
import { AuthService } from 'src/app/utils/auth/auth.service';
import { CrudService } from 'src/app/utils/crud/crud.service';
import { FileUpload } from 'src/app/utils/model/file-upload';
import { Item } from 'src/app/utils/model/item';
import  *  as CryptoJS from  'crypto-js';

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
  title66:any;
  title7:any;
  title77:any;
  title88:any;
  title90:any;
  title900:any;

  color:any;

  imgGet:any;

  photo:any;
  photo2:any;
  photo3:any;
  photo4:any;
  style:any;

  visible=true;
  visibleQr=false;
  visibleT=false;

  stateCheck=true;
  stateCheck2=false;

  selecetdFileChange! : File;
  imagePreviewChange:any;

  selecetdFileChangeForm! : File;
  imagePreviewChangeForm:any;

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

  selectedFilesOk!: File;
  selectedFilesApi!: File;
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

  check=false;
  check2=true;
  check3=false;
  check4=false;

  checkForm1=false;
  checkForm2=false;
  checkForm3=false;

  visibleWedding=false;
  visibleAutres=false;

  visibleForm1=false;
  visibleForm2=false;
  visibleForm3=false;

  valueCount!:number;
  valueCredit!:number;

  checkingRole=true;
  checkingRole2=false;

  constructor(private crud:CrudService,public formBuilder: FormBuilder, public router:Router, 
    public dialog:MatDialog, public auth:AuthService, private cookieService: CookieService) {
    this.infosForm = this.formBuilder.group({
      //name: this.title2,
      email_user: this.getDataEmail('yyyy-0000'),
      date:this.changedDate,
    })
   }

  ngOnInit(): void {

    this.title88=" & ";

    this.checkRole();

    let email=this.getDataEmail('yyyy-0000');
    
    this.crud.countUpload(email).subscribe(res=>{
      this.valueCount=res['value'];
      //console.log('papa'+this.valueCount);

    }, error=>{
    });

    this.crud.verifyForfait(email).subscribe(res=>{
      this.valueCredit=Number(res["creditt"]);
      //console.log('papa'+res["creditt"]);
    }, error=>{

    });

    
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
    this.photo='../../../../assets/templates/b11.png';
    this.style='black';
  }

  changeBack2(){   
    this.photo='../../../../assets/templates/img2.jpg';
    this.style='black';
  }

  changeBack3(){   
    this.photo='../../../../assets/templates/b10.png';
    this.style='black';
  }

  changeBack4(){   
    this.photo='../../../../assets/templates/c3.jpg';
    this.style='white';
  }

  changeBack5(){   
    this.photo='../../../../assets/templates/c4.jpg';
    this.style='black';
  }

  changeBack6(){   
    this.photo='../../../../assets/templates/b7.png';
    this.style='black';
  }

  changeBack7(){   
    this.photo='../../../../assets/templates/img7.jpg';
    this.style='white';
  }

  changeBack8(){   
    this.photo='../../../../assets/templates/c5.jpg';
    this.style='black';
  }

  changeBack9(){   
    this.photo='../../../../assets/templates/img9.webp';
  }

  changeBack10(){   
    this.photo='../../../../assets/templates/b8.png';
    this.style='black';
  }

  changeBack11(){  
    this.photo=this.imagePreviewChange;
    this.style=this.color;
   // alert(this.color);
  }

  changeBack12(){  
    this.photo2=this.imagePreviewChangeForm;
    this.style=this.color;
   // alert(this.color);
  }

  changeBack122(){  
    this.photo3='../../../../assets/templates/fond40.png';
    this.style='black';
   // alert(this.color);
  }

  changeBack123(){  
    this.photo3='../../../../assets/templates/fond41.png';
    this.style='black';
   // alert(this.color);
  }

  changeBack124(){  
    this.photo3='../../../../assets/templates/fond42.png';
    this.style='black';
   // alert(this.color);
  }

  changeBack125(){  
    this.photo3='../../../../assets/templates/fond43.png';
    this.style='black';
   // alert(this.color);
  }

  changeBack126(){  
    this.photo3='../../../../assets/templates/fond45.png';
    this.style='black';
   // alert(this.color);
  }

  changeBack100(){  
    this.photo4='../../../../assets/templates/fond45.png';
    this.style='black';
   // alert(this.color);
  }

  changeBack101(){  
    this.photo4='../../../../assets/templates/fond45.png';
    this.style='black';
   // alert(this.color);
  }

  changeBack102(){  
    this.photo4='../../../../assets/templates/fond45.png';
    this.style='black';
   // alert(this.color);
  }

  changeBack103(){  
    this.photo3='../../../../assets/templates/fond45.png';
    this.style='black';
   // alert(this.color);
  }

  changeBack104(){  
    this.photo3='../../../../assets/templates/fond45.png';
    this.style='black';
   // alert(this.color);
  }

  onColorChange(event:any){
    this.color=event.target.value;
    //alert(this.color);
  }

  downloadImage(){

    if(this.valueCredit>0){

      let email=this.getDataEmail('yyyy-0000');

      let newCredit=this.valueCredit-1;

      //localStorage.removeItem('nomInvite');
      //localStorage.setItem('nomInvite',this.title2);

      this.crud.updateCredit(email,newCredit).subscribe(res=>{

        const ok= html2canvas(this.screen.nativeElement).then(canvas => {
          this.canvas.nativeElement.src = canvas.toDataURL();
          this.downloadLink.nativeElement.href = canvas.toDataURL('image/png');
          this.downloadLink.nativeElement.download = this.title2+'.png';
          this.downloadLink.nativeElement.click();
        
          this.visible=false;
    
          canvas.toBlob( (blob:any) => {
           
            const file = new File( [ blob ],  this.title2+'.png',{ type: "image/png" });
            const dT = new DataTransfer();
            dT.items.add( file );
    
            //this.selectedFilesOk=file;
            this.selectedFilesApi=file;
        
          //window.location.reload();
          
          } );      
    
          
         
        });

      });

    }else{
      this.router.navigate(['/paiement-forfait'])
    }
  

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
   
    let file=this.selectedFilesOk;
  
    if(file){
      
      this.currentFileUpload = new FileUpload(file);
      this.crud.addInvitation(this.currentFileUpload,this.infosForm.value);

      //window.location.reload()

    }
    
  }

  uploadInvitationApi(){

      if(this.valueCredit>0){

        let file=this.selectedFilesApi;
      
        if(file){
          
          let email=this.getDataEmail('yyyy-0000');

          let name=localStorage.getItem('nomInvite');

          this.crud.addInvitationApi(file,email,'invitation',this.title2)
          .subscribe(
            response =>{
              //this.dialogSuccess("Success");
            },
            error =>{
              //alert(error)
              console.log(error['message']);
            }
          );
    
        }


      }else{
        this.router.navigate(['/paiement-forfait'])
      }
    
  }

  uploadInvitationApi2(){
     
     if(this.valueCredit>0){

      let file= this.selectedFilesT.item(0);
      
        if(file){
          
          let email=this.getDataEmail('yyyy-0000');

          let name=localStorage.getItem('nomInvite');

          this.crud.addInvitationApi(file,email,'invitation',this.title90)
          .subscribe(
            response =>{
              //this.dialogSuccess("Success");
            },
            error =>{
              //alert(error)
              console.log(error['message']);
            }
          );
    
        }


      }else{
        this.router.navigate(['/paiement-forfait'])
      }

  }

  

  uploadInvitationFrom(){
    
    localStorage.setItem('nomForm',this.title90);

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
      //this.selectedFiles=this.downloadLink.nativeElement.click();

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

  
 checkCheckBoxvalue(event: any ){
  this.check= event.target.checked;
  if(this.check==true){
    this.title88=" & ";
    this.visibleWedding=true;
    this.visibleAutres=false;  

   

  }else{
    this.title88="";
    this.title77="";
    this.title1="";
    this.title2="";
    this.title3="";
    this.title4="";
    this.title6="";
    this.title66="";
    this.title7="";
    this.title900="";
  
    this.visibleWedding=false;
  }
  
}

checkCheckBoxvalue2(event: any ){
  this.check2= event.target.checked;
  if(this.check2==true){
    this.title88="";
    this.visibleAutres=true;
    this.visibleWedding=false;

    
   
  }else{
    this.title88="";
    this.visibleAutres=false;
    this.title77="";
    this.title1="";
    this.title2="";
    this.title3="";
    this.title4="";
    this.title6="";
    this.title66="";
    this.title7="";
    this.title900="";
  }
}

checkForm1value(event: any ){
  this.checkForm1= event.target.checked;

  if(this.checkForm1==true){
    this.visibleForm1=true
    this.visibleForm2=false
    this.visibleForm3=false
  }
}

checkForm2value(event: any ){
  this.checkForm2= event.target.checked;

  if(this.checkForm2==true){
    this.visibleForm2=true
    this.visibleForm1=false
    this.visibleForm3=false
  }
}

checkForm3value(event: any ){
  this.checkForm3= event.target.checked;

  if(this.checkForm3==true){
    this.visibleForm3=true
    this.visibleForm1=false
    this.visibleForm2=false
  }
}



onConfirmation(){
    
  let refDialog=this.dialog.open(ConfirmationComponent,{data:'Voulez-vous vous Déconnecter ?'});


  refDialog.afterClosed().subscribe(res=>{
    if(res == 'true'){
      this.auth.logoutApi();
    }
  })
}

dialogSuccess(message:any){
  const timeout=1400;

    let dialogRef=this.dialog.open(SuccessComponent,{data:message});

      dialogRef.afterOpened().subscribe(_ => {
        setTimeout(() => {
           dialogRef.close();
           window.location.reload();
        }, timeout)
      })
}

dialogSuccess2(message:any){
  const timeout=1400;

    let dialogRef=this.dialog.open(SuccessComponent,{data:message});

      dialogRef.afterOpened().subscribe(_ => {
        setTimeout(() => {
           dialogRef.close();
           //window.location.reload();
        }, timeout)
      })
}

  onFileUploadChange(event:any){
    this.selecetdFileChange = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
    this.imagePreviewChange = reader.result;
    };
    reader.readAsDataURL(this.selecetdFileChange);
  }

  onFileUploadChangeForm(event:any){
    this.selecetdFileChangeForm = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
    this.imagePreviewChangeForm = reader.result;
    };
    reader.readAsDataURL(this.selecetdFileChangeForm);
  }

checkRole(){

  let roleKey=this.decryptRoleKey('role');
  let roleCheck=this.getData('xxxx-0000');

  if(roleCheck=='Client'){
    this.checkingRole=false;
  }else if(roleCheck=='Admin'){
    this.checkingRole2=true;
  }else{
    this.auth.logoutApi();
  }
}

private decryptRole(txtToDecrypt: string) {
  return CryptoJS.AES.decrypt(txtToDecrypt, 'role').toString(CryptoJS.enc.Utf8);
}

private decryptEmail(txtToDecrypt: string) {
  return CryptoJS.AES.decrypt(txtToDecrypt, 'email_user').toString(CryptoJS.enc.Utf8);
}

public getData(key: string) {
  let data = this.cookieService.get(key)|| "";
  return this.decryptRole(data);
}

public getDataEmail(key: string) {
  let data = localStorage.getItem(key)|| "";
  return this.decryptEmail(data);
}

private decryptRoleKey(txtToDecrypt: string) {
  return CryptoJS.AES.decrypt(txtToDecrypt, 'role').toString(CryptoJS.enc.Utf8);
}

public getDataKey(key: string) {
  let data = this.cookieService.get(key)|| "";
  return this.decryptRoleKey(data);
}

private decryptEmailKey(txtToDecrypt: string) {
  return CryptoJS.AES.decrypt(txtToDecrypt, 'email_user').toString(CryptoJS.enc.Utf8);
}

public getDataEmailKey(key: string) {
  let data = this.cookieService.get(key)|| "";
  return this.decryptEmailKey(data);
}



}
