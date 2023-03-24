import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-paiement-form',
  templateUrl: './paiement-form.component.html',
  styleUrls: ['./paiement-form.component.css']
})
export class PaiementFormComponent implements OnInit {

  montant:any;
  forfait:any;

  constructor() { }

  ngOnInit(): void {
    this.getAmount();
  }

  getAmount(){
    this.montant= localStorage.getItem('mt-a-payer');
    this.forfait= localStorage.getItem('forfait-a-payer');
  }

  addTransaction(){
    
  }

}
