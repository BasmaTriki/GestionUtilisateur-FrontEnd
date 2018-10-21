import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDemandeVacComponent } from './modal-demande-vac.component';

describe('ModalDemandeVacComponent', () => {
  let component: ModalDemandeVacComponent;
  let fixture: ComponentFixture<ModalDemandeVacComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDemandeVacComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDemandeVacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
