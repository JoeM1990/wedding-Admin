import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as htmlToImage from 'html-to-image';
import html2canvas from 'html2canvas';

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

  visible:false | undefined;
  

  @ViewChild('screen')
  screen!: ElementRef;
  @ViewChild('canvas')
  canvas!: ElementRef;
  @ViewChild('downloadLink')
  downloadLink!: ElementRef;


  constructor() { }

  ngOnInit(): void {
  }

  generateImage(){
    var node:any = document.getElementById('sectionImage');
    htmlToImage.toPng(node)
      .then(function (dataUrl) {
        var img = new Image();
        img.src = dataUrl;
        document.body.appendChild(img);
        var imgGet=dataUrl;
        //alert(dataUrl);
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

  // generateImageDiv(){
  //   let element = document.querySelector("#capture");
  //   html2canvas(document).then(function(canvas) {
  //       // Convert the canvas to blob
  //       canvas.toBlob(function(blob){
  //           // To download directly on browser default 'downloads' location
  //           let link = document.createElement("a");
  //           link.download = "image.png";
  //           link.href = URL.createObjectURL(blob);
  //           link.click();

  //           // To save manually somewhere in file explorer
  //           window.saveAs(blob, 'image.png');
            

  //       },'image/png');
  //   });
  // }



  downloadImage(){
    html2canvas(this.screen.nativeElement).then(canvas => {
      this.canvas.nativeElement.src = canvas.toDataURL();
      this.downloadLink.nativeElement.href = canvas.toDataURL('image/png');
      this.downloadLink.nativeElement.download = this.title2+'.png';
      this.downloadLink.nativeElement.click();
    });
  }


}
