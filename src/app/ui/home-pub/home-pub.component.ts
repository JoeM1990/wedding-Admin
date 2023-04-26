import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-pub',
  templateUrl: './home-pub.component.html',
  styleUrls: ['./home-pub.component.css']
})
export class HomePubComponent implements OnInit {

  

  constructor() { }

  ngOnInit(): void {
    
  }

  imageObject: Array<object> = [{
    image: 'assets/img/slider/1.jpg',
    thumbImage: 'assets/img/slider/1_min.jpeg',
    alt: 'alt of image',
    title: 'title of image'
    }, {
    image: '.../iOe/xHHf4nf8AE75h3j1x64ZmZ//Z==', // Support base64 image
    thumbImage: '.../iOe/xHHf4nf8AE75h3j1x64ZmZ//Z==', // Support base64 image
    title: 'Image title', //Optional: You can use this key if want to show image with title
    alt: 'Image alt', //Optional: You can use this key if want to show image with alt
    order: 1 //Optional: if you pass this key then slider images will be arrange according @input: slideOrderType
  }
  ];

}
