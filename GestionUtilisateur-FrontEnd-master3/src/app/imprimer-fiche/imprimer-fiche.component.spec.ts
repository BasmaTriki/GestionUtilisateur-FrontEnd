import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImprimerFicheComponent } from './imprimer-fiche.component';

describe('ImprimerFicheComponent', () => {
  let component: ImprimerFicheComponent;
  let fixture: ComponentFixture<ImprimerFicheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImprimerFicheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImprimerFicheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
