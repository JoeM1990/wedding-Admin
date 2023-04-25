import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePubComponent } from './home-pub.component';

describe('HomePubComponent', () => {
  let component: HomePubComponent;
  let fixture: ComponentFixture<HomePubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomePubComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomePubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
