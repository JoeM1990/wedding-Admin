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

  changeBack(){
  //document.querySelector('fondChange')?.style
  }


}
