import { Component, OnInit } from '@angular/core';
import * as htmlToImage from 'html-to-image';

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
    this.photo='../../../../assets/templates/img1.jpg';
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
    this.photo='../../../../assets/templates/img8.jpg';
  }

  changeBack9(){   
    this.photo='../../../../assets/templates/img9.webp';
  }

  changeBack10(){   
    this.photo='../../../../assets/templates/img10.jpg';
  }


}
