import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsContractuelComponent } from './details-contractuel.component';

describe('DetailsContractuelComponent', () => {
  let component: DetailsContractuelComponent;
  let fixture: ComponentFixture<DetailsContractuelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsContractuelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsContractuelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
