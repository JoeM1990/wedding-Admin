import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contactForm:FormGroup;

  constructor(public formBuilder:FormBuilder
    , public dialog:MatDialog) { 
    this.contactForm=this.formBuilder.group(
      {
      name: ['',[Validators.required, Validators.pattern("[a-zA-Z ]*")]],
      email: ['',[Validators.required,Validators.pattern("[^ @]*@[^ @]*"),]],
      message: ['',[Validators.required,]],
      }
    )
  }

  ngOnInit(): void {
  }

}
