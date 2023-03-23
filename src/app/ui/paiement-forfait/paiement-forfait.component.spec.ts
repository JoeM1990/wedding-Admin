import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaiementForfaitComponent } from './paiement-forfait.component';

describe('PaiementForfaitComponent', () => {
  let component: PaiementForfaitComponent;
  let fixture: ComponentFixture<PaiementForfaitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaiementForfaitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaiementForfaitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
