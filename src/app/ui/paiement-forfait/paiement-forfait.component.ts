import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paiement-forfait',
  templateUrl: './paiement-forfait.component.html',
  styleUrls: ['./paiement-forfait.component.css']
})
export class PaiementForfaitComponent implements OnInit {

  constructor(public router:Router) { }

  ngOnInit(): void {
  }

  setAmount(montant:any,forfait:any){
    localStorage.setItem('mt-a-payer',montant);
    localStorage.setItem('forfait-a-payer',forfait);
  }

  goToHome(){
    this.router.navigate(['/dashboard']);
  }


}
