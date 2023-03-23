import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaiementFormComponent } from './paiement-form.component';

describe('PaiementFormComponent', () => {
  let component: PaiementFormComponent;
  let fixture: ComponentFixture<PaiementFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaiementFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaiementFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
