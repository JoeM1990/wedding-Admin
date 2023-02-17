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
  }

  changeBack2(){   
    this.photo='../../../../assets/templates/img2.jpg';
  }

  changeBack3(){   
    this.photo='../../../../assets/templates/img11.avif';
  }

  changeBack4(){   
    this.photo='../../../../assets/templates/img4.jpg';
  }

  changeBack5(){   
    this.photo='../../../../assets/templates/img5.webp';
  }

  changeBack6(){   
    this.photo='../../../../assets/templates/img6.jpg';
  }

  changeBack7(){   
    this.photo='../../../../assets/templates/img7.jpg';
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
