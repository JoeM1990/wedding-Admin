import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleClientComponent } from './comple-client.component';

describe('CompleClientComponent', () => {
  let component: CompleClientComponent;
  let fixture: ComponentFixture<CompleClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompleClientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompleClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
