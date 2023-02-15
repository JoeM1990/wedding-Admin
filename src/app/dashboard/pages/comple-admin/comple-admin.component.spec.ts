import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleAdminComponent } from './comple-admin.component';

describe('CompleAdminComponent', () => {
  let component: CompleAdminComponent;
  let fixture: ComponentFixture<CompleAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompleAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompleAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
