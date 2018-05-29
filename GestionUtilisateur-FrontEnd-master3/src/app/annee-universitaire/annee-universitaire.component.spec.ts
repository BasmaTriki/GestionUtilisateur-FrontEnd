import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnneeUniversitaireComponent } from './annee-universitaire.component';

describe('AnneeUniversitaireComponent', () => {
  let component: AnneeUniversitaireComponent;
  let fixture: ComponentFixture<AnneeUniversitaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnneeUniversitaireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnneeUniversitaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
