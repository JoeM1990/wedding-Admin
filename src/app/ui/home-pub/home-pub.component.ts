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

  imgCollection: Array<object> = [
    {
      image: 'assets/model/Joe.png',
      thumbImage: 'assets/model/Joe.png',
      alt: 'Image 1',
      title: 'Image 1'
    }, {
      image: 'assets/model/Joe (1).png',
      thumbImage: 'assets/model/Joe (1).png',
      title: 'Image 2',
      alt: 'Image 2'
    }, {
      image: 'assets/model/Joe (2).png',
      thumbImage: 'assets/model/Joe (2).png',
      title: 'Image 3',
      alt: 'Image 3'
    }, {
      image: 'assets/model/Joe (3).png',
      thumbImage: 'assets/model/Joe (3).png',
      title: 'Image 4',
      alt: 'Image 4'
    }, {
      image: 'assets/model/Joe (4).png',
      thumbImage: 'assets/model/Joe (4).png',
      title: 'Image 5',
      alt: 'Image 5'
    }, {
      image: 'assets/model/Joe (5).png',
      thumbImage: 'assets/model/Joe (5).png',
      title: 'Image 6',
      alt: 'Image 6'
    }
];

}
